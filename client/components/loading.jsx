const React = require('react');
const { useState, useEffect } = require('react');



const LoadingScreen = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : '')); // Cycle through 0-3 dots
        }, 500); // Update every 500ms

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Loading{dots}</h1>
        </div>
    );
};

module.exports = LoadingScreen;