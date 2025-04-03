import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { GameDetails } from './components';


const socket = io();

const HostPage = () => {
    const [players, setPlayers] = useState([]);
    const [gameStats, updateGame] = useState({});
    const [gameStarted, setGameStarted] = useState(false); // Track if the game has started


    useEffect(() => {


        socket.on('update player list', (playerList) => {
            console.log('update player list');
            setPlayers(playerList);
        });

        socket.on('update game', (game) => {
            updateGame(game);
            setGameStarted(game.gameStarted);
        })
    }, []);

    const handleStartGame = () => {
        // Emit the 'start game' event to the server
        socket.emit('start game', 'The game has started!');
    };

    const handleStopGame = () => {
        setGameStarted(false);
        socket.emit('stop game', () => {
            console.log('Game stopped');
        });
    };

    const handleRestartGame = () => {
        socket.emit('restart game');
    }


    return (

        <div>
            <h1>Host Page</h1>
            <h2>Leaderboard</h2>
            <ul id='player-list'>

                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name + "   Score: " + player.totalScore + " " + player.id}</li>
                ))}
            </ul>

            <button
                onClick={handleStartGame}
                className="btn btn-primary"
                disabled={gameStarted}
            >
                {gameStarted ? 'Game Started' : 'Start Game'}
            </button>
            <button
                onClick={handleStopGame}
                className="btn btn-danger"
                disabled={!gameStarted}
            >
                Stop Game
            </button>
            <button
                onClick={handleRestartGame}
                className="btn btn-danger"
            >
                Restart Game
            </button>
            <GameDetails game={gameStats} />

        </div>
    );
};

const init = () => {
    socket.emit('stop game', () => { });
    socket.emit('get player count', () => { });
    const root = createRoot(document.getElementById('host-content'));

    root.render(
        <HostPage />
    );
};

window.onload = init;