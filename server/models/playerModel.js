class Player {
    constructor() {
        this.name = 'Player';
        this.playerNum;
        this.totalScore = 0;
        this.answered = false;
        this.exited = false;
        this.out = false;
        this.roundsSurvived = 0;
    }
}

module.exports = {
    Player
};