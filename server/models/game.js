
class Game {
    constructor() {
        this.players = [];
        this.rounds = [];
        this.currentRound = 0;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    startGame() {
        this.currentRound = 1;
        this.rounds.push(new Round(this.players));
    }

    endGame() {
        this.currentRound = 0;
    }

    nextRound() {
        this.currentRound += 1;
        this.rounds.push(new Round(this.players));
    }
}