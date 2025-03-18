import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();

const HostPage = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Register the socket listener when the component mounts
        socket.on('update player list', (playerList) => {
            console.log('update player list');
            setPlayers(playerList);
        });

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off('update player list');
        };
    }, []);

    const handleStartGame = () => {
        // Emit the 'start game' event to the server
        socket.emit('start game', { message: 'The game has started!' });
    };

    return (
        <div>
            <h1>Host Page</h1>
            
            <ul id='player-list'>
                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name + " " + player.id}</li>
                ))}
            </ul>

            {/* Add the Start Game button */}
            <button onClick={handleStartGame} className="btn btn-primary">
                Start Game
            </button>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('host-content'));

    root.render(
        <HostPage />
    );
};

window.onload = init;