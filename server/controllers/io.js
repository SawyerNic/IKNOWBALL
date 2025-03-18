const http = require('http');
const { Server } = require('socket.io');
const { Player, gameModel } = require('../models');
let io;

const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    const game = new gameModel();

    io.on('connection', (socket) => {

        console.log('a user connected');
        
        socket.on('add player', (playerNum) => {
            console.log(`Player ${playerNum} joined`);


            const player = new Player();
            player.id = playerNum; 
            game.addPlayer(player);
            socket.emit('update player list', game.players);
            console.log(game.getPlayerCount());

        });

        socket.on('get player count', (callback) => {
            callback(game.getPlayerCount());
        });

        socket.on('start game', (msg) => {
            console.log('game started');
            // console.log('message: ' + msg);
            io.emit('Game started', msg);
        });


        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });

    return server;
};

module.exports = socketSetup;