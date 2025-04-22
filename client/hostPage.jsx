const { createRoot } = require('react-dom/client');
const React = require('react');
const { useState, useEffect } = require('react');
const { GameDetails, Leaderboard } = require('./components');
const socket = require('./socket'); // Use CommonJS syntax for socket import


const HostPage = () => {
    const [gameStats, updateGame] = useState({});
    const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

    useEffect(() => {

        socket.on('update game', (game) => {
            updateGame(game);
            setGameStarted(game.gameStarted);
        })
    }, []);

    const handleStartGame = () => {
        // Emit the 'start game' event to the server
        socket.emit('start game', 'The game has started!');
        setGameStarted(true);
    };

    const handleCancelGame = () => {
        socket.emit('cancel game');
        setGameStarted(false);
    }

    return (

        <div id='home-content'>
            <div className="baseball-banner">
                {Array.from({ length: 10 }).map((_, index) => (
                    <img key={index} src="assets/img/baseball.png" className="baseball" style={{ animationDelay: `${index * 0.5}s` }} alt="Baseball" />
                ))}
            </div>
            <img src="assets/img/IKNOWBALL-LOGO-T.png" alt="IKNOWBALL" width="640px" height="480px"></img>
            <h2>Game Code: 1234</h2>
            <button
                onClick={handleStartGame}
                className="btn btn-primary"
                disabled={gameStarted}
            >
                {gameStarted ? 'Game Started' : 'Start Game'}
            </button>
            <button
                onClick={handleCancelGame}
                className="btn btn-danger"
            >
                Cancel Game
            </button>
            <Leaderboard/>
            <GameDetails game={gameStats} />

        </div>
    );

};

const init = () => {
    const root = createRoot(document.getElementById('host-content'));

    root.render(
        <HostPage />
    );
};

window.onload = init;