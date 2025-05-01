const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const { Leaderboard } = require('./leaderboard');

/*
    what should be on this page: 
    1.) Your answer was correct or incorrect
    2.) Leaderboard
*/

const ResultView = () => {
    const [myPlayerResults, setMyPlayerResults] = useState(null);

    useEffect(() => {
        socket.emit('get myplayer results');

        socket.on('return myplayer results', (results) => {
            if (!results || Object.keys(results).length === 0) {
                setMyPlayerResults({ message: "Player didn't answer" });
            } else {
                setMyPlayerResults(results);
            }
        });

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off('return myplayer results');
        };
    }, []);

    return (
        <div>
            <h1>Results</h1>
            {myPlayerResults ? (
                myPlayerResults.message ? (
                    <h3>{myPlayerResults.message}</h3>
                ) : (
                    <h3>
                        Your answer was{' '}
                        {myPlayerResults.correct ? 'correct' : 'incorrect'}!{' '}
                        {myPlayerResults.correct && (
                            <>You earned {myPlayerResults.score} points.</>
                        )}
                    </h3>
                )
            ) : (
                <p>Loading results...</p>
            )}
            <Leaderboard />
        </div>
    );
};

module.exports = ResultView;