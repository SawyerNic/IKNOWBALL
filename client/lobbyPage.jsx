import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();

const LobbyWindow = () => {

    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');

    socket.on('update player list', (playerList) => {
        console.log('update player list');
        setPlayers(playerList);
    });

    socket.on('player created', (player) => {
        console.log('player name ' + player.name); // Logs the player object
        sessionStorage.setItem('player', JSON.stringify(player));
    });

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleNameSubmit = () => {
        const nameBox = document.getElementById('name-input')
        const newName = nameBox.value;

        if (newName === '') {
            setName('mysterious');
            socket.emit('change name', 'mysterious');
        } else {
            setName(newName);
            socket.emit('change name', newName);
        }

        // Emit the 'change name' event to the server

    };


    return (
        <div>
            <h1>Lobby Window</h1>
            <h3>Welcome {name || 'Player'}!</h3>
            <div id='player-profile'>
                <input
                    id='name-input'
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button onClick={handleNameSubmit}>Change Name</button>
            </div>

            <ul id='player-list'>
                {Object.values(players || {'empty':'empty'}).map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
}

const init = () => {
    const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
    socket.emit('add player', savedPlayer);

    const rootElement = document.getElementById('body');
    const root = createRoot(rootElement);

    root.render(
        <LobbyWindow />
    )

    socket.on('game started', () => {
        window.location.href = '/gamePage';
    });


}

window.onload = init;