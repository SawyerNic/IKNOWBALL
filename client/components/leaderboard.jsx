const React = require('react');
const { useState, useEffect } = require('react');
const socket = io();

const GameDetails = ({ game }) => {

    const [gameData, setGameData] = useState(game);

    socket.on('update game', (game) => {
        console.log('game started ? ' + game.gameStarted);
        setGameData(game);
    });

    if (!game) {
        return <div>No game data available</div>;
    }

    return (
        <div>
            <h2>Game Details</h2>
            <p><strong>Round:</strong> {gameData.currentRound}</p>
            <p><strong>Game Started:</strong> {gameData.gameStarted ? 'Yes' : 'No'}</p>
        </div>
    );
};

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Register the 'update game' event listener
        const handleUpdateGame = (game) => {
            setPlayers(game.players);
        };

        socket.on('update game', handleUpdateGame);

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off('update game', handleUpdateGame);
        };
    }, []);

    if (!players || players.length === 0) {
        return <div>No players available</div>;
    }

    return (
        <div>
            <ul id='player-list'>

                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name + " | Points: " + player.totalScore + " | answered: " + player.answered}</li>
                ))}
            </ul>
        </div>
    );
}

module.exports = {
    GameDetails,
    Leaderboard
};