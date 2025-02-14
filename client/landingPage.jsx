import { createRoot } from 'react-dom/client';


const React = require('react');

const HomePage = () => {
    return (
        <div id='home-content'>
        <h1>Landing Page</h1>
        <p id='welcome'>Welcome to IKNOWBALL!</p>
        <div>
            <button type='button' className='btn btn-primary'> Start Game </button>
        </div>
        </div>

    );
}

const init = () => {
    const root = createRoot(document.getElementById('content'));

    root.render(
        <HomePage/>
    )
}

window.onload = init;