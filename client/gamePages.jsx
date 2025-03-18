import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();


const GameWindow = () => {
    return (
        <div>
            <h1>Game Window</h1>
        </div>
    );
}

const LobbyWindow = () => {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');


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

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleNameSubmit = () => {
        // Emit the 'change name' event to the server
        socket.emit('change name', name);
    };

    return (
        <div>
            <h1>Lobby Window</h1>
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

    socket.emit('get player count', (playerID) => {
        socket.emit('add player', playerID);
    });

    root.render(
        <LobbyWindow />
    )

    socket.on('game started', () => {
        root.render(
            <GameWindow/>
        )
    })

    socket.on('test', () => {
        console.log('hello');
    });


}

window.onload = init;