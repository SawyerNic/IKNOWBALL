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
    const [name, setName] = useState(() => {
        const storedPlayer = sessionStorage.getItem('player');
        return storedPlayer ? JSON.parse(storedPlayer).name : '';
    });

    console.log(JSON.parse(sessionStorage.getItem('player')).name);

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

    socket.emit('get player count', () => {
        const storedPlayer = sessionStorage.getItem('player');

        if (storedPlayer) {
            try {
                const userID = JSON.parse(storedPlayer).id;
                console.log(userID);
                console.log('TRUE');
                console.log(JSON.parse(storedPlayer));
                socket.emit('reconnecting', userID);
            } catch (error) {
                console.error('Error parsing sessionStorage player data:', error);
            }
        } else {
            console.log('FALSE!');
            socket.emit('add player', () => {});
        }
    });

    root.render(
        <LobbyWindow />
    )

    socket.on('game started', () => {
        root.render(
            <GameWindow />
        )
    });

    socket.on('player created', (player) => {
        console.log(player); // Logs the player object
        sessionStorage.setItem('player', JSON.stringify(player)); // Store as a JSON string
        console.log(JSON.parse(sessionStorage.getItem('player'))); // Retrieve and parse back into an object
    });

    socket.on('test', () => {
        console.log('hello');
    });


}

window.onload = init;