const http = require('http');
const { Server } = require('socket.io');
const { Player, gameModel } = require('../models');
let io;

const getActivePlayers = (game) => {
    const activePlayers = Object.values(game.players).filter(player => !player.exited);
    console.log('Active Players:', activePlayers); // Debugging
    return activePlayers;
};


const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    const game = new gameModel();

    io.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('add player', () => {
            console.log(`Player joined`);


            const player = new Player();
            player.id = socket.id;
            player.name = 'Player ';
            game.addPlayer(player);
            socket.emit('player created', player);
            io.emit('update player list', getActivePlayers(game));
            game.playerToJoin += 1;
            console.log(game.getPlayerCount());


        });

        socket.on('reconnecting', (userID) => {
            console.log(getActivePlayers());
            game.getPlayer(userID).exited = false;
        })

        socket.on('get player count', (callback) => {
            callback(game.playerToJoin);

            io.emit('update player list', getActivePlayers(game)); // Emit only active players
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

            // Find the player associated with this socket
            const playerId = socket.id;
            const player = game.getPlayer(playerId);

            if (player) {
                player.exited = true; // Mark the player as exited
                console.log(`Player ${playerId} exited. Current player count: ${game.getPlayerCount()}`);
            } else {
                console.log(`Player with ID ${playerId} not found.`);
            }

            io.emit()
        });

    });

    return server;
};

module.exports = socketSetup;