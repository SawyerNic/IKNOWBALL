import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();

const GameWindow = () => {
    const [myPlayer, updatePlayer] = useState(null);
    const [question, updateQuestion] = useState({});

    socket.on('player created', (player) => {
        updatePlayer(player)
    });

    socket.on('question', (sentQuestion) => {
        updateQuestion(sentQuestion);
    })

    if(!myPlayer) {
        return(
            <div>
                <h1>Game already started! Please wait for next game.</h1>
            </div>
        );
    }

    return (
        <div>
            <h3>{myPlayer.name + " " + myPlayer.id}</h3>
            <h3>points: {myPlayer.totalScore}</h3>
            <div id='question-container'>
                {question}
            </div>
        </div>
    )
}

const init = () => {
    socket.emit('get game');
    socket.on('return game', (game) => {
        console.log(game);
        console.log(game.gameStarted);
        if(!game.gameStarted){
            window.location.href = '/lobby';
        }
    })

    const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
    savedPlayer.id = socket.id;
    socket.emit('add player', savedPlayer);
    
    const rootElement = document.getElementById('content');
    const root = createRoot(rootElement);

    root.render(
        <GameWindow />
    )

}

window.onload = init;