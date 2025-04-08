
class gameModel {
    constructor() {
        this.players = {};
        this.rounds = 1;
        this.currentRound = 0;
        this.playerToJoin = 1;
        this.gameStarted = false;
        this.leaderBoard;
        this.questions;
        this.timer = null; 
        this.timeLeft = 0; 
    }

    addPlayer(player) {
        this.players[player.id] = player;
    }

    getPlayer(playerId) {
        return this.players[playerId];
    }

    removePlayer(playerId) {
        delete this.players[playerId];
    }

    getPlayerCount() {
        return Object.values(this.players).length; // Corrected method to get player count
    }

    updateDetailedList() {
        this.leaderBoard = Object.values(this.players).sort((a, b) => {
            if (b.roundsSurvived !== a.roundsSurvived) {
                return b.roundsSurvived - a.roundsSurvived;
            }
            return b.score - a.score;
        });
    }

    getSortedPlayers() {
        this.updateDetailedList();
        return this.leaderBoard;
    }

    handlePlayerAnswer(id, answer) {
        if(answer){
            this.players[id].totalScore += 1000;
        }
    }

    startTimer(duration, onTick, onComplete) {

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timeLeft = duration;

        this.timer = setInterval(() => {
            this.timeLeft -= 1;
            if (onTick) onTick(this.timeLeft);

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                if (onComplete) onComplete();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

module.exports = {
    gameModel
};