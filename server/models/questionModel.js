
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
        this.answer;
        this.imageLink;
    } 
}

module.exports = {
    Option, Question
};