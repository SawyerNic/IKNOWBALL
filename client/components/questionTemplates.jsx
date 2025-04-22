const React = require('react');
const { useState } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const { useDispatch } = require('react-redux'); // Import useDispatch
const { Provider } = require('react-redux');
const { playerActions } = require('../reducers/playerReducer');

const QuestionComponent = ({ question, answerHandler, myPlayer }) => {
    const [answered, setAnswered] = useState(false);
    const [timer, updateTimer] = useState(15);
    const dispatch = useDispatch();

    console.log(sessionStorage.getItem('player'));
    if (!question) {
        return (<div>No question provided</div>);
    }

    // Handle 'timer update' event
    socket.on('timer update', (timeLeft) => {
        updateTimer(timeLeft);
    });


    const handleOptionClick = (option) => {
        console.log("Option clicked:", option);

        setAnswered(true);

        dispatch(playerActions.setPlayer({ ...myPlayer, answered: true }));

        // TODO: show the component after the player answers
        answerHandler(option.isAnswer);
        console.log(sessionStorage.getItem('player'));
    };

    // TODO 
    if (answered) {
        return <h2>Answered</h2>; // Show "answered" header if the question has been answered
    }

    return (
        <div className="question-container" style={{ textAlign: 'center', margin: '20px' }}>
            <div>
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
                    <button
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