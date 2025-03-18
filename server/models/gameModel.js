
class gameModel {
    constructor() {
        this.players = [];
        this.rounds = [];
        this.currentRound = 0;
    }

    addPlayer(player) {
        this.players.push(player);
    }


}

module.exports = {
    gameModel
};