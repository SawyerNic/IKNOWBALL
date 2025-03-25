const http = require('http');
const { Server } = require('socket.io');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

const { Player, gameModel } = require('../models');
const { getTestQuestions } = require('./questionManager')
const { QuestionComponent } = require('../components');


let io;

const getActivePlayers = (game) => {
    console.log(game.players);
    const activePlayers = Object.values(game.players).filter(player => !player.exited);
    return activePlayers;
};

const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    const game = new gameModel();

    game.questions = getTestQuestions();

    io.on('connection', (socket) => {

        console.log('a user connected');

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
            game.addPlayer(player);
            game.playerToJoin += 1;

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
            // console.log('message: ' + msg);

            io.emit('game started', game);
            io.emit('question', QuestionComponent(game.questions[game.currentRound] ) );
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