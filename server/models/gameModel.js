
class gameModel {
    constructor() {
        this.players = {};
        this.rounds = 1;
        this.currentRound = 0;
        this.playerToJoin = 1;
        this.gameStarted = false;
        this.leaderBoard = {};
        this.questions;
        this.timer = null;
        this.timeLeft = 0;
        this.playersAnswered = {};
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

    changePlayerName(playerId, newName) {
        const player = this.getPlayer(playerId);
        if (!player) {
            console.error(`Error: Player with ID ${playerId} does not exist.`);
            return;
        }
        player.name = newName;
        console.log(`Player ID ${playerId} name changed to ${newName}`);
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
        console.log('Player ID:', id);
        console.log('Players:', this.players);

        if (!this.players[id]) {
            console.error(`Player with ID ${id} does not exist.`);
            return;
        }

        this.players[id].answered = true;
        this.playersAnswered[id] = this.players[id];

        if (answer) {
            const roundScore = Math.round(((this.timeLeft + 1) / 15) * 1000);
            this.players[id].totalScore += roundScore;
        } else {
            this.players[id].perfect = false;
        }

        // Update the leaderboard after processing the player's answer
        this.updateDetailedList();
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

    cancelGame() {
        this.stopTimer(); // Stop the timer when restarting the game
        this.gameStarted = false;
        this.currentRound = 0;
        this.leaderBoard = null;
    }
}

module.exports = {
    gameModel
};