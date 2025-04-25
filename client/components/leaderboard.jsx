const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import

const GameDetails = ({ game }) => {

    const [gameData, setGameData] = useState(game);

    socket.on('update game', (game) => {
        setGameData(game);
    });

    if (!game) {
        return <div>No game data available</div>;
    }

    return (
        <div>
            <h2>Game Details</h2>
            <p>Round: {gameData.currentRound + 1}</p>
            <p>Game Started: {gameData.gameStarted ? 'Yes' : 'No'}</p>
        </div>
    );
};

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // Listen for updates to the leaderboard
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

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul id="leaderboard-list">
                {leaderboard.map((player, index) => (
                    <li key={player.id}>
                        {index + 1}. {player.name} - Points: {player.totalScore}, Rounds Survived: {player.roundsSurvived}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PlayerList = () => {
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
        return <div>No players yet.</div>;
    }

    return (
        <div>
            <ul id='player-list'>

                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name + " | In: " + player.perfect + " | Points: " + player.totalScore + " | answered: " + player.answered}</li>
                ))}
            </ul>
        </div>
    );
}



module.exports = {
    GameDetails,
    PlayerList,
    Leaderboard
};