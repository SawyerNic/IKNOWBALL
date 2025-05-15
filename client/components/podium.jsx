const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const { Leaderboard } = require('./leaderboard');

const Podium = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // Listen for leaderboard updates
        const handleUpdateGame = (game) => {
            setLeaderboard(game.leaderBoard || []);
        };

        socket.on('update game', handleUpdateGame);

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off('update game', handleUpdateGame);
        };
    }, []);

    if (!leaderboard || leaderboard.length === 0) {
        return <div>No leaderboard data available.</div>;
    }

    // Extract the top three players
    const topThree = leaderboard.slice(0, 3);

    const handleBackToLobby = () => {
        socket.emit('get lobby'); // Emit an event to reset the game
    };

    return (
        <div>
            <h1>Game over!</h1>
            <div id="podium">
                {topThree.map((player, index) => (
                    <div key={player.id} className={`podium-place place-${index + 1}`}>
                        <h3>{index + 1}. {player.name} - Points: {player.totalScore}</h3>
                    </div>
                ))}
            </div>
            <button onClick={handleBackToLobby} className="btn back-to-lobby">
                Back to Lobby
            </button>
            <Leaderboard/>

        </div>
    );
};

module.exports = Podium;