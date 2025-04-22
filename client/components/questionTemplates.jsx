const React = require('react');
const { useState } = require('react');

const socket = io();

const QuestionComponent = ({ question, answerHandler }) => {
    const [answered, setAnswered] = useState(false);

    console.log(sessionStorage.getItem('player'));
    if (!question) {
        return (<div>No question provided</div>);
    }

    socket.on('server send question', () => {
        setAnswered(false);
    })

    const handleOptionClick = (option) => {
        console.log("Option clicked:", option);

        setAnswered(true);

        // TODO: show the component after the player answers
        answerHandler(option.isAnswer);
        sessionStorage.getItem('player').answered = true;
    };

    // TODO 
    if (answered) {
        return <h2>Answered</h2>; // Show "answered" header if the question has been answered
    }

    return (
        <div className="question-container" style={{ textAlign: 'center', margin: '20px' }}>
            <h2>{question.prompt}</h2>
            {question.imageLink && (
                <img
                    src={question.imageLink}
                    alt="Question"
                    style={{ maxWidth: '50%', height: 'auto', marginBottom: '20px' }}
                />
            )}
            <div>
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
