const http = require('http');
const { Server } = require('socket.io');

const { Player, gameModel } = require('../models');
const { getTestQuestions } = require('./questionManager');

let io;

const sanitizeGame = (game) => {
    return {
        players: game.players,
        rounds: game.rounds,
        currentRound: game.currentRound,
        playerToJoin: game.playerToJoin,
        gameStarted: game.gameStarted,
        leaderBoard: game.leaderBoard,
        questions: game.questions.map((q) => ({
            prompt: q.prompt,
            options: q.options,
            imageLink: q.imageLink,
        })), // Exclude circular references or unnecessary data
    };
};

const sendQuestion = (game) => {
    console.log('Sending question for round:', game.currentRound);

    const currentQuestion = game.questions[game.currentRound];
    io.emit('server send question', currentQuestion);

    // Start the timer using the gameModel's timer
    game.startTimer(
        15, // 15-second duration
        (timeLeft) => {
            io.emit('timer update', timeLeft); 
            io.emit('update game', sanitizeGame(game));
        },
        () => {
            
            // Move to the next round or end the game
            game.currentRound += 1;
            console.log(`Current round: ${game.currentRound} + game.questions.length: ${game.questions.length}`);
            if (game.currentRound < game.questions.length) {
                sendResults(game); // Send the next question
            } else {
                game.cancelGame();
                console.log('Game over');
                io.emit('game over', game.getSortedPlayers());
                io.emit('game cancelled');
                io.emit('update game', sanitizeGame(game)); 
            }
        }
    );
};

const sendResults = (game) => {

    io.emit('server send results', game);

    game.startTimer(
        5,
        (timeLeft) => {
            io.emit('timer update', timeLeft);
        },
        () => {
            sendQuestion(game);
        }
    )
}

const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    const game = new gameModel();

    game.questions = getTestQuestions();

    io.on('connection', (socket) => {

        console.log(`A user connected with socket ID: ${socket.id}. Total connections: ${io.engine.clientsCount}`);

        socket.on('cancel game', () => {
            game.cancelGame();
            io.emit('update game', sanitizeGame(game));
            io.emit('game cancelled');
        });

        socket.on('game request', () => {
            io.emit('update game', sanitizeGame);
        })

        socket.on('get game state', () => {
            socket.emit('send game state', sanitizeGame(game))
        })

        socket.on('add player', (passedPlayer) => {
            let player = new Player();

            if (passedPlayer && Object.keys(passedPlayer).length > 0) {
                player = { ...player, ...passedPlayer };
                console.log('adding existing player');

            } else {
                player.name = 'Player ' + game.playerToJoin;
                game.playerToJoin += 1;
                console.log('adding new player');
            }
            player.id = socket.id;
            game.addPlayer(player);

            socket.emit('player created', player);
            io.emit('update game', sanitizeGame(game)); 

        });

        socket.on('start game', () => {

            game.gameStarted = true;
            io.emit('game started');
            console.log('game started');

            // Wait a short time to ensure clients are ready before sending the first question
            setTimeout(() => {
                sendQuestion(game);
            }, 1000); // 1-second delay

        });

        socket.on('player send answer', (answer) => {
            game.handlePlayerAnswer(socket.id, answer);
            console.log('player id ' + socket.id + ' answer ' + answer);
            io.emit('update game', sanitizeGame(game));
        });

        socket.on('change name', (newName) => {

            game.changePlayerName(socket.id, newName);
            socket.emit('name change confirm', game.getPlayer(socket.id));
            io.emit('update game', sanitizeGame(game));
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            game.removePlayer(socket.id);
            console.log(game.players);
        });

    });

    return server;
};

module.exports = socketSetup;