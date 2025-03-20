import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();

const HostPage = () => {
    const [players, setPlayers] = useState([]);
    let message = <h1>big</h1>;

    socket.on('game started', () => {
        console.log('big guey');
        message = <h1>kill john lennon</h1>;
    })

    // Register the socket listener when the component mounts
    socket.on('update player list', (playerList) => {
        console.log('update player list');
        setPlayers(playerList);
    });

    const handleStartGame = () => {
        // Emit the 'start game' event to the server
        socket.emit('start game', { message: 'The game has started!' });
    };

    return (

        <div>
            <h1>Host Page</h1>
            {message}
            <ul id='player-list'>
                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>

            <button onClick={handleStartGame} className="btn btn-primary">
                Start Game
            </button>
        </div>
    );
};

const init = () => {
    socket.emit('get player count', () => {});
    const root = createRoot(document.getElementById('host-content'));

    root.render(
        <HostPage />
    );
};

window.onload = init;