import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();

const GameWindow = () => {
    const [myPlayer, updatePlayer] = useState(null);

    useEffect(() => {
        const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
        if (savedPlayer) {
            updatePlayer(savedPlayer); // Update state after the component mounts
        } 
        socket.emit('update game');
    }, []); // Empty dependency array ensures this runs only once

    if(!myPlayer) {
        return(
            <div>
                <h1>Game already started! Please wait for next game.</h1>
            </div>
        );
    }

    return (
        <div>
            <h3>{myPlayer.name}</h3>
            <h3>points: {myPlayer.totalScore}</h3>
            <div id='question-container'></div>
        </div>
    )
}

const init = () => {
    const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
    socket.emit('add player', savedPlayer);

    const rootElement = document.getElementById('content');
    const root = createRoot(rootElement);

    console.log(JSON.parse(sessionStorage.getItem('player')));

    root.render(
        <GameWindow />
    )

}

window.onload = init;