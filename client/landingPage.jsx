import { createRoot } from 'react-dom/client';
const React = require('react');

const HomePage = () => {
    return (
        <div>
        <h1>Landing Page</h1>
        <p>Welcome to IKNOWBALL!</p>
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