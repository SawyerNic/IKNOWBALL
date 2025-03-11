import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

const HomePage = () => {
    const [isJoining, setIsJoining] = useState(false);

    const handleJoinGame = () => {
        setIsJoining(!isJoining);
    }

    return (
        <div id='home-content'>
            <h1>Landing Page</h1>
            <p id='welcome'>Welcome to IKNOWBALL player!</p>
            {isJoining ? (
                <div>
                    <button type='button' onClick={handleJoinGame}>back</button>
                    <div>
                        <input type='text' placeholder='Enter game code' />
                        <button type='button' className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            ) : (
                <div>
                    <button type='button' className='btn btn-primary'>Host Game</button>
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