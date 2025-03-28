const React = require('react');

const QuestionComponent = ({ question, answerHandler }) => {
    if (!question) {
        return (<div>No question provided</div>);
    }

    const handleOptionClick = (option) => {
        console.log("Option clicked:", option);

        if (option.isAnswer) {
            answerHandler(true);
        } else {
            answerHandler(false);
        }
    };

    return (
        <div className="question-container" style={{ textAlign: 'center', margin: '20px' }}>
            <h2>{question.prompt}</h2>
            {question.imageLink && (
                <img
                    src={question.imageLink}
                    alt="Question"
                    style={{ maxWidth: '10%', height: 'auto', marginBottom: '20px' }}
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