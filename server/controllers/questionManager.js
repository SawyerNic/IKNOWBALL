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

    // Second question
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

    // Fourth question
    const optionsFour = [
        new Option('Aaron Nieboer', true),
        new Option('Mookie Betts', false),
        new Option('Bryce Harper', false),
        new Option('Freddie Freeman', false)
    ];

    const questionFour = new Question();
    questionFour.imageLink = 'https://rawcdn.githack.com/SawyerNic/IKNOWBALL/79a36cd60500100f6ce199742c156e4813d9735c/images/aaron.png';
    questionFour.options = optionsFour;

    questionFour.prompt = 'Who is this player?';
    questionFour.answer = optionsFour[0];

    // Fifth question
    const optionsFive = [
        new Option('Mookie Betts', false),
        new Option('Mike Trout', false),
        new Option('David Munson', true),
        new Option('Freddie Freeman', false)
    ];

    const questionFive = new Question();
    questionFive.imageLink = 'https://rawcdn.githack.com/SawyerNic/IKNOWBALL/79a36cd60500100f6ce199742c156e4813d9735c/images/munson.png';
    questionFive.options = optionsFive;

    questionFive.prompt = 'Who is this player?';
    questionFive.answer = optionsFive[0];

    // Sixth question
    const optionsSix = [
        new Option('Bryce Harper', false),
        new Option('David Schwartz', true),
        new Option('Mookie Betts', false),
        new Option('Freddie Freeman', false)
    ];

    const questionSix = new Question();
    questionSix.imageLink = 'https://rawcdn.githack.com/SawyerNic/IKNOWBALL/79a36cd60500100f6ce199742c156e4813d9735c/images/david.png';
    questionSix.options = optionsSix;

    questionSix.prompt = 'Who is this player?';
    questionSix.answer = optionsSix[0];

    return [questionFour, questionFive, questionSix, question, questionTwo, questionThree];
};

module.exports = {
    getTestQuestions
};