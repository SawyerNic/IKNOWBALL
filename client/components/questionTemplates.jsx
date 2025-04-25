const React = require('react');
const { useState } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const store = require('../store');
const { useDispatch, useSelector } = require('react-redux'); // Import useDispatch
const { playerActions } = require('../reducers/playerReducer');

const QuestionComponent = ({ question, answerHandler }) => {
    const [timer, updateTimer] = useState(15);
    const dispatch = useDispatch();
    const myPlayer = useSelector((state) => state.player); // Get the player state directly from Redux

    if (!question) {
        return (<div>No question provided</div>);
    }

    // Handle 'timer update' event
    socket.on('timer update', (timeLeft) => {
        updateTimer(timeLeft);
    });

    const handleOptionClick = (option) => {
        console.log("Option clicked:", option);


        console.log(myPlayer);

        
        // TODO: show the component after the player answers
        answerHandler(option.isAnswer);
        console.log(sessionStorage.getItem('player'));
    };

    return (
        <div className="question-container" style={{ textAlign: 'center', margin: '20px' }}>
            <div>
                <h1></h1>
                <h3>Timer: {timer}</h3>
                <h3>points: {myPlayer.totalScore}</h3>
            </div>

            <h2>{question.prompt}</h2>
            {question.imageLink && (
                <img
                    src={question.imageLink}
                    alt="Question"
                    style={{ maxWidth: '50%', height: 'auto', marginBottom: '20px' }}
                />
            )}
            <div className="options-container">
                {question.options.map((option, index) => (
                    <button className="btn"
                        key={index}
                        onClick={() => handleOptionClick(option)}

                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

module.exports = QuestionComponent;
