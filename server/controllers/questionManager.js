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
    questionTwo.imageLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Aaron_Judge_2018.jpg/1200px-Aaron_Judge_2018.jpg';
    questionTwo.options = optionsTwo;

    questionTwo.prompt = 'Who is this player?';
    questionTwo.answer = optionsTwo[1];

    
};