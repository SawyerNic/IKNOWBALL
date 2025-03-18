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
            player.id = socket.id;
            player.name = 'Player ' + playerNum;
            game.addPlayer(player);
            io.emit('update player list', game.players);
            game.playerToJoin += 1;
            console.log(game.getPlayerCount());


        });

        socket.on('get player count', (callback) => {
            callback(game.playerToJoin);
        });

        socket.on('start game', (msg) => {
            console.log('game started');
            // console.log('message: ' + msg);
            io.emit('game started', msg);
        });

        socket.on('change name', (newName) => {
            const playerId = socket.id;
            const player = game.players[playerId];
            if (player) {
                player.name = newName;
                io.emit('update player list', game.players); // Broadcast updated player list
                console.log(`Player ${playerId} changed name to ${newName}`);
            }
        });


        socket.on('disconnect', () => {
            console.log('user disconnected');

            // Find and remove the player associated with this socket
            const playerId = socket.id; // Use socket.id as the player's unique identifier
            game.removePlayer(playerId);

            // Emit the updated player list to all connected clients
            io.emit('update player list', game.players);

            console.log(`Player ${playerId} removed. Current player count: ${game.getPlayerCount()}`);
        });

    });

    return server;
};

module.exports = socketSetup;