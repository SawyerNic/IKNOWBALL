import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();


const GameWindow = () => {
    return (
        <div>
            <h1>Game Window</h1>
            <div id='question-container'></div>
        </div>
    );
}

const LobbyWindow = () => {

    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');

    socket.on('update player list', (playerList) => {
        console.log('update player list');
        setPlayers(playerList);
    });


    const handleNameChange = (e) => {
        setName(e.target.value);
        console.log(sessionStorage.getItem('player').name)

    };

    const handleNameSubmit = () => {
        // Emit the 'change name' event to the server
        socket.emit('change name', name);
    };

    return (
        <div>
            <h1>Lobby Window</h1>
            <h3>Welcome {name || '!'}</h3>
            <div id='player-profile'>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button onClick={handleNameSubmit}>Change Name</button>
            </div>

            <ul id='player-list'>
                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
}

const init = () => {

    const rootElement = document.getElementById('body');
    const root = createRoot(rootElement);

    socket.emit('add player');

    socket.on('player created', (player) => {
        console.log('player name' + player.name); // Logs the player object
        sessionStorage.setItem('player', JSON.stringify(player));
    });

    socket.on('test', () => {
        console.log('hello');
    });

    root.render(
        <LobbyWindow />
    )

    socket.on('game started', () => {
        root.render(
            <GameWindow />
        )
    });


}

window.onload = init;