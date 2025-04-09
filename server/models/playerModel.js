class Player {
    constructor() {
        this.name = 'Player';
        this.playerNum;
        this.totalScore = 0;
        this.answered = false;
        this.exited = false;
        this.roundsSurvived = 0;
        this.perfect = true;
    }
}

module.exports = {
    Player
};