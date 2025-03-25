
class gameModel {
    constructor() {
        this.players = {};
        this.rounds = 1;
        this.currentRound = 0;
        this.playerToJoin = 1;
        this.gameStarted = false;
        this.questions;
    }

    addPlayer(player) {
        this.players[player.id] = player; // Use player ID as the key
    }

    getPlayer(playerId) {
        return this.players[playerId]; // Method to get a player by ID
    }

    removePlayer(playerId) {
        delete this.players[playerId]; // Method to remove a player by ID
    }

    getPlayerCount() {
        return Object.values(this.players).length; // Corrected method to get player count
    }

}

module.exports = {
    gameModel
};