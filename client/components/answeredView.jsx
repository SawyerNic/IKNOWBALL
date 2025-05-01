const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import

/*
    what should be on this page: 
    1.) Youn answered in *blank* seconds!
    2.) List of other people that answered popping in
    3.)
*/

const AnsweredView = () => {
    const [answeredList, updateAnsweredList] = useState([]);

    useEffect(() => {

        socket.on('send answered list', (sentList) => {
            updateAnsweredList(sentList);
        })

    }, []);


    return (
        <div className='answered-container'>
            <div className='break'></div>
            <h1>Answer Locked In</h1>
            <ul id='player-list'>
                {Object.values(answeredList).map((player) => (
                    <li key={player.id}>{player.name + " answered"}</li>
                ))}
            </ul>

        </div>
    )
}

module.exports = AnsweredView;
