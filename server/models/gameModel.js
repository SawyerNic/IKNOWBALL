
class gameModel {
    constructor() {
        this.players = {};
        this.rounds = 1;
        this.currentRound = 0;
        this.playerToJoin = 1;
        this.gameStarted = false;
        this.detailedList;
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

    updateDetailedList() {
        this.detailedList = Object.values(this.players).sort((a, b) => {
            if (b.roundsSurvived !== a.roundsSurvived) {
                return b.roundsSurvived - a.roundsSurvived;
            }
            return b.score - a.score;
        });
    }

    getSortedPlayers() {
        this.updateDetailedList();
        return this.detailedList;
    }

    handlePlayerAnswer(id, answer) {
        if(answer){
            
        }
    }
}

module.exports = {
    gameModel
};