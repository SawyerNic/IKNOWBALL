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

    socket.on('update game', (game) => {
        if(!game.gameStarted) {
            window.location.href = '/lobby';
        } else {
            window.location.href = '/gamePage';
        }
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
        <div id="home-content">
            <div className="baseball-banner">
                {Array.from({ length: 10 }).map((_, index) => (
                    <img key={index} src="assets/img/baseball.png" className="baseball" style={{ animationDelay: `${index * 0.5}s` }} alt="Baseball" />
                ))}
            </div>
            <img src="assets/img/IKNOWBALL-LOGO-T.png" alt="IKNOWBALL" width="640px" height="480px"></img>
            <h3>Welcome {name || 'Player'}!</h3>
            <div id='player-profile'>
                <input
                    id='name-input'
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button type="button" className="btn btn-primary" onClick={handleNameSubmit}>Change Name</button>
            </div>

            <ul id='player-list'>
                {Object.values(players || {'empty':'empty'}).map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
}

window.onload = init;