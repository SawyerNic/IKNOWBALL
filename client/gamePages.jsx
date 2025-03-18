import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

const socket = io();


const showJoinedPlayers = () => {

    const playerList = document.querySelector('#players-list');

}

const GameWindow = () => {
    return (
        <div>
            <h1>Game Window</h1>
        </div>
    );
}

const LobbyWindow = () => {
    const [players, setPlayers] = useState([]);


    socket.on('update player list', (playerList) => {
            setPlayers(playerList);
    })

    return (
        <div>
            <h1>Lobby Window</h1>
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

    socket.emit('get player count', (playerCount) => {
        socket.emit('add player', playerCount + 1);
    });


    root.render(
        
        <LobbyWindow />
    )

    socket.on('test', () => {
        console.log('hello');
    });


}

window.onload = init;