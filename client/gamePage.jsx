import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { QuestionComponent } from './components';
import { getMyPlayer } from './helper';

const socket = io();

const sendAnswer = (answer) => {
    socket.emit('player send answer', answer);
}
/*
    Changes to be made for storing players:
    
    - Every action by the client will be
    immediately written into session storage

    - Immediately after that the session storage
    information will used and passed by an to
    the server via a socket event

    - This is so that if connection is 
    interrupted or if the user reloads 
    or changes pages they will still have
    their progress in the game and can 
    continue playing

    - We can make functions that do this
    such as this example:

        handleAnswer() {
            //update global player variable
            player.answered = true
            //write to local storage
            sessionStorage.setItem('player', JSON.stringify(player));
            
            sendAnswer(options.answer);
        }
*/

/* TODO: the question component reloads every timer update,
         this needs to be changed so that when this page
         loads it recognizes what page the player should be
         seeing
*/

const GameWindow = () => {
    const [myPlayer, updatePlayer] = useState(null);
    const [gameWindow, updateGameWindow] = useState(null);
    const [timer, updateTimer] = useState(15);

    socket.on('update game', (game) => {
        // console.log(getMyPlayer(game, socket.id))
        if (!game.gameStarted) {
            window.location.href = '/lobby';
        }
    });

    socket.on('player created', (player) => {
        updatePlayer(player)
    });

    socket.on('server send question', (sentQuestion) => {
        console.log("sentQuestion: " + JSON.stringify(sentQuestion));
        updateGameWindow(<QuestionComponent question={sentQuestion} answerHandler={sendAnswer} />);
    });

    socket.on('timer update', (timeLeft) => {
        updateTimer(timeLeft)
    })

    if (!myPlayer) {
        return (
            <div>
                <h1>Game already started! Please wait for next game.</h1>
            </div>
        );
    }

    return (
        <div>
            <h3>{myPlayer.name + " " + myPlayer.answered}</h3>
            <h3>points: {myPlayer.totalScore}</h3>
            <h3>Timer: {timer}</h3>
            <div id='question-container'>
                {gameWindow}
            </div>
        </div>
    )
}

const init = () => {

    const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
    savedPlayer.id = socket.id;
    socket.emit('add player', savedPlayer);

    const rootElement = document.getElementById('content');
    const root = createRoot(rootElement);

    root.render(
        <GameWindow />
    );




}

window.onload = init;