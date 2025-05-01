
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

    updateLeaderboard() {
        this.leaderBoard = Object.values(this.players).sort((a, b) => {
            // Players who are perfect should be ranked higher
            if (b.perfect !== a.perfect) {
                return b.perfect - a.perfect; // `true` (1) comes before `false` (0)
            }
            // If both players have the same `perfect` status, sort by totalScore
            return b.totalScore - a.totalScore;
        });
    }

    clearScores() {
        Object.values(this.players).forEach(player => {
            player.totalScore = 0;
        });
    }

    resetPerfect() {
        Object.values(this.players).forEach(player => {
            player.perfect = true;
        });
    }

    clearLastAnswer() {
        Object.values(this.players).forEach(player => {
            player.answered = false;
            player.lastAnswer = {}; // Reset the lastAnswer property
        });
        console.log('All last answers have been cleared.');
    }

    getSortedPlayers() {
        this.updateLeaderboard();
        return this.leaderBoard;
    }

    resetPlayers() {
        this.resetPerfect();
        this.clearLastAnswer();
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
        this.players[id].lastAnswer.score = 0;
        this.players[id].lastAnswer.correct = answer;

        if (answer) {
            let roundScore = Math.round(((this.timeLeft + 1) / 15) * 1000);
            this.players[id].totalScore += roundScore;
            this.players[id].lastAnswer.score = roundScore;
            
        } else {
            this.players[id].perfect = false;
        }

        // Update the leaderboard after processing the player's answer
        this.updateLeaderboard();
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
        this.resetPlayers();
        this.stopTimer(); // Stop the timer when restarting the game
        this.gameStarted = false;
        this.currentRound = 0;
    }
}

module.exports = {
    gameModel
};