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

    return (
        <div>
            <h1>Lobby Window</h1>
        </div>
    )
}

const init = () => {

    const rootElement = document.getElementById('body');
    const root = createRoot(rootElement);

    root.render(
        <LobbyWindow />
    )

    socket.on('test', () => {
        console.log('hello');
    });
}

window.onload = init;