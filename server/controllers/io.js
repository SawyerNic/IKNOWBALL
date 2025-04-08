const http = require('http');
const { Server } = require('socket.io');

const { Player, gameModel } = require('../models');
const { getTestQuestions } = require('./questionManager');

let io;

const getActivePlayers = (game) => {
    console.log(game.players);
    const activePlayers = Object.values(game.players).filter(player => !player.exited);
    return activePlayers;
};

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
            io.emit('update game', sanitizeGame(game)); // Update the game state for all players
        },
        () => {
            console.log('Timer ended. Submitting answers...');
            io.emit('submit answers');

            // Move to the next round or end the game
            game.currentRound += 1;
            if (game.currentRound < game.questions.length) {
                sendQuestion(game); // Send the next question
            } else {
                console.log('Game over');
                io.emit('game over', game.getSortedPlayers());
                io.emit('stop game');
            }
        }
    );
};

const stopGame = (game) => {
    console.log('Game stopped');
    game.stopTimer(); // Stop the timer when the game is stopped
}

const restartGame = (game) => {
    game.stopTimer(); // Stop the timer when restarting the game
    game.gameStarted = false;
    game.currentRound = 0;
    game.leaderBoard = null;
}

const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    const game = new gameModel();

    game.questions = getTestQuestions();



    io.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('restart game', () => {
            restartGame(game);
            io.emit('update game', sanitizeGame(game)); 
        });

        socket.on('stop game', () => {
            stopGame(game);
            io.emit('update game', sanitizeGame(game)); 
        });

        socket.on('add player', (passedPlayer) => {
            let player = new Player();

            console.log('passed player ' + passedPlayer);
            if (passedPlayer) {
                player = { ...player, ...passedPlayer };
                player.id = socket.id;
            } else {
                player.id = socket.id;
                player.name = 'Player ' + game.playerToJoin;
                game.playerToJoin += 1;
            }
            game.addPlayer(player);

            socket.emit('player created', player);
            io.emit('update player list', game.players);

        });


        socket.on('get player count', () => {
            io.emit('update player list', getActivePlayers(game));
        });

        socket.on('update game', () => {
            io.emit('update player list', getActivePlayers(game));
        });

        socket.on('start game', () => {
            console.log('game started');
            game.gameStarted = true;

            // Wait a short time to ensure clients are ready before sending the first question
            setTimeout(() => {
                sendQuestion(game);
            }, 1000); // 1-second delay
            io.emit('update game', sanitizeGame(game)); 
        });

        socket.on('player send answer', (answer) => {
            game.handlePlayerAnswer(socket.id, answer);
            console.log('player id ' + socket.id + ' answer ' + answer);
            io.emit('update player list', game.players);
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