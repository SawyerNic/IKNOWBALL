
class Option {
    constructor(text, isAnswer) {
        this.text = text;
        this.isAnswer = isAnswer;
    }
}

class Question {
    constructor() {
        this.prompt = "blank";
        this.options = [];
        this.image;
        this.answer;
    } 
}

module.exports = {
    Option, Question
};