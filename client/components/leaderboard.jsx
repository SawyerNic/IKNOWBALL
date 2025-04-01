const React = require('react');

const GameDetails = ({ game }) => {
    if (!game) {
        return <div>No game data available</div>;
    }

    return (
        <div>
            <h2>Game Details</h2>
            <p><strong>Rounds:</strong> {game.rounds}</p>
            <p><strong>Game Started:</strong> {game.gameStarted ? 'Yes' : 'No'}</p>
            <h3>Questions:</h3>
            <ul>
                {game.questions && game.questions.length > 0 ? (
                    game.questions.map((question, index) => (
                        <li key={index}>
                            <strong>Question {index + 1}:</strong> {question.prompt}
                        </li>
                    ))
                ) : (
                    <li>No questions available</li>
                )}
            </ul>
        </div>
    );
};

module.exports = GameDetails;