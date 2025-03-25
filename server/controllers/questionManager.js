const { Question, Option } = require('../models');

const getTestQuestions = () => {
    // Options for the first question:
    const options = [
        new Option('Aaron Judge', true),
        new Option('Juan Soto', false),
        new Option('Shohei Ohtani', false),
        new Option('Francisco Lindor', false)
    ];

    const question = new Question();
    question.imageLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Aaron_Judge_2018.jpg/1200px-Aaron_Judge_2018.jpg';
    question.options = options;

    question.prompt = 'Who is this player?';
    question.answer = options[0];

    // second question
    const optionsTwo = [
        new Option('Aaron Judge', false),
        new Option('Juan Soto', true),
        new Option('Shohei Ohtani', false),
        new Option('Francisco Lindor', false)
    ];

    const questionTwo = new Question();
    questionTwo.imageLink = 'https://rawcdn.githack.com/SawyerNic/IKNOWBALL/15b12488154b49dd08474c57968d42625dff483c/src/IMG_6358.jpg';
    questionTwo.options = optionsTwo;

    questionTwo.prompt = 'Who is this player?';
    questionTwo.answer = optionsTwo[1];

    // Third question
    const optionsThree = [
        new Option('Aaron Judge', false),
        new Option('Juan Soto', false),
        new Option('Shohei Ohtani', false),
        new Option('Francisco Lindor', true)
    ];

    const questionThree = new Question();
    questionThree.imageLink = 'https://nationaltoday.com/wp-content/uploads/2022/09/Francisco-Lindor.jpg';
    questionThree.options = optionsThree;

    questionThree.prompt = 'Who is this player?';
    questionThree.answer = optionsThree[3];

    return [question, questionTwo, questionThree];
};

module.exports = {
    getTestQuestions
};