import { createRoot } from 'react-dom/client';
const React = require('react');

const HomePage = () => {
    return (
        <div>
        <h1>Landing Page</h1>
        <p id='welcom'>Welcome to IKNOWBALL!</p>
        <div>
            <button type="button"> button </button>
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