class Player {
    constructor() {
        this.name = 'Player';
        this.playerNum;
        this.totalScore = 0;
        this.answered = false;
        this.exited = false;
        this.roundsSurvived = 0;
        this.perfect = true;
        this.place = 0;
        this.lastAnswer = {};
    }
}

module.exports = {
    Player
};