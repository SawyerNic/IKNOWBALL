const { io } = require('socket.io-client'); // Use CommonJS syntax
const socket = io(); // Initialize the socket connection once
module.exports = socket;