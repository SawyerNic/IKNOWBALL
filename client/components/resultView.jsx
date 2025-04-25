const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const { Leaderboard } = require('./leaderboard');

/*
    what should be on this page: 
    1.) Your answer was correct or incorrect
    2.) Leaderboard
    3.)
*/

const ResultView = () => {

    return (
        <div>
            <h1>PlayerList:</h1>
            <Leaderboard /> 
        </div>
    )
}

module.exports = ResultView;
