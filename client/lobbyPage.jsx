import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();
let player;

const LobbyWindow = () => {

    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {

        if (player?.name) {
            setName(player.name);
        }

        // Register socket event listeners
        socket.on('player created', (player) => {
            console.log('player name ' + player.name); // Logs the player object
            sessionStorage.setItem('player', JSON.stringify(player));
        });

        socket.on('update game', (game) => {
            setPlayers(game.players);

            if (game.gameStarted) {
                window.location.href = '/gamePage';
            }
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off('player created');
            socket.off('update game');
        };
    }, []); // Empty dependency array ensures this runs only once


    const handleNameChange = () => {
        const nameBox = document.getElementById('name-input')
        const newName = nameBox.value;
        player.name = newName;

        if (newName === '') {
            setName('mysterious');
            socket.emit('change name', 'mysterious');
            player.name = 'mysterious';
            sessionStorage.setItem('player', JSON.stringify(player));
        } else {
            setName(newName);
            socket.emit('change name', newName);
            sessionStorage.setItem('player', JSON.stringify(player));
        }
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
                    onChange={handleNameChange}
                />
            </div>

            <ul id='player-list'>
                {Object.values(players || { 'empty': 'empty' }).map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
}

const init = () => {
    const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
    socket.emit('add player', savedPlayer);
    player = savedPlayer;

    const rootElement = document.getElementById('body');
    const root = createRoot(rootElement);

    root.render(
        <LobbyWindow />
    )
}

window.onload = init;