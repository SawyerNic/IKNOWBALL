const http = require('http');
const { Server } = require('socket.io');

let io;

const socketSetup = (app) => {

    const server = http.createServer(app);
    io = new Server(server);

    io.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });

    return server;
};

module.exports = {
    socketSetup
};