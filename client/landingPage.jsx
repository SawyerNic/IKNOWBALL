import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

const helper = require('./helper');


const HomePage = () => {
    const [isJoining, setIsJoining] = useState(false);

    const handleJoinGame = () => {
        setIsJoining(!isJoining);
    }

    const handleJoinAttempt = () => {

        let textBox = document.getElementById('text-box');

         if(textBox.value === '1234'){
            console.log('true');
            window.location.href = '/lobby';
        } else{
            console.log('false');
        }
    }

    const handleGetHostPage = () => {
        window.location.href = '/hostPage'
    }

    return (
        <div id='home-content'>
            <p id='welcome'>Welcome to IKNOWBALL player!</p>
            {isJoining ? (
                <div>
                    <button type='button' onClick={handleJoinGame}>back</button>
                    <div>
                        
                        <input type='text' id='text-box' placeholder='Enter game code'/>
                        <button type='button' className='btn btn-primary' onClick={handleJoinAttempt}>Submit</button>
                    </div>
                </div>
            ) : (
                <div>
                    <button type='button' className='btn btn-primary' onClick={handleGetHostPage}>Host Game</button>
                    <button type='button' className='btn btn-primary' onClick={handleJoinGame}>Join Game</button>
                </div>
            )}
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('content'));

    root.render(
        <HomePage />
    )
}

window.onload = init;