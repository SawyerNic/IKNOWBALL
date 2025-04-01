const http = require('http');
const { Server } = require('socket.io');

const { Player, gameModel } = require('../models');
const { getTestQuestions } = require('./questionManager');

let io;

let timerInterval = null;

const getActivePlayers = (game) => {
    console.log(game.players);
    const activePlayers = Object.values(game.players).filter(player => !player.exited);
    return activePlayers;
};

const sendQuestion = (game) => {
    console.log(game.currentRound);
    const currentQuestion = game.questions[game.currentRound];
    io.emit('server send question', currentQuestion);

    let timeLeft = 15; // 15-second timer

    const timerInterval = setInterval(() => {
        timeLeft -= 1;
        io.emit('timer update', timeLeft); // Send the remaining time to all clients
        io.emit('update Game', game); // Send the updated game state to all clients
        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            console.log('Timer ended. Submitting answers...');
            io.emit('submit answers'); 

            game.currentRound += 1;
            console.log('game: ' + game);
            if (game.currentRound < game.questions.length) {
                sendQuestion(game); // Send the next question
            } else {
                console.log('Game over');
                io.emit('game over', game.getSortedPlayers());
            }
        }
    }, 1000); // Update every second
};

const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    const game = new gameModel();

    game.questions = getTestQuestions();



    io.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('restart game', () => {
            clearInterval(timerInterval);
            game.gameStarted = false;
            game.currentRound = 0;
        })

        socket.on('add player', (passedPlayer) => {
            let player = new Player();

            console.log('passed player ' + passedPlayer);
            if (passedPlayer) {
                player = { ...player, ...passedPlayer };
                player.id = socket.id;
            } else {
                player.id = socket.id;
                player.name = 'Player ' + game.playerToJoin;
            }
            game.playerToJoin += 1;
            game.addPlayer(player);

            socket.emit('player created', player);
            io.emit('update player list', game.players);

        });

        socket.on('get my player', (id) => {
            const player = game.players[id];
            if (player) {
                console.log('player exists');
                socket.emit('my player', player);
            } else {
                console.log('player doesnt exist');

            }
        });

        socket.on('get game', () => {
            console.log(game.gameStarted);
            socket.emit('return game', game);
            
        })

        socket.on('get player count', () => {
            io.emit('update player list', getActivePlayers(game));
        });

        socket.on('update game', () => {
            io.emit('update player list', getActivePlayers(game));
        });

        socket.on('start game', () => {
            console.log('game started');
            game.gameStarted = true;

            sendQuestion(game);

            io.emit('game started', game);
        });

        socket.on('player send answer', (answer) => {
            console.log('player id ' + socket.id + ' answer ' + answer);
        });

        socket.on('change name', (newName) => {
            const playerId = socket.id;
            const player = game.players[playerId];
            if (player) {
                player.name = newName;
                io.emit('update player list', game.players);
                console.log(`Player ${playerId} changed name to ${newName}`);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            game.removePlayer(socket.id);
            console.log(game.players);
            io.emit('update player list', game.players);
        });

    });

    return server;
};

module.exports = socketSetup;