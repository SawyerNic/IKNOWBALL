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

    if (!players || players.length === 0) {
        return <div>No players available</div>;
    }

    // Listen for the 'update player list' event
    socket.on('update player list', (playerList) => {
        console.log('update player list');
        setPlayers(playerList);
    });

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul id='player-list'>

                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name + " " + player.totalScore + " " + player.id}</li>
                ))}
            </ul>
        </div>
    );
}

module.exports = {
    GameDetails,
    Leaderboard
};