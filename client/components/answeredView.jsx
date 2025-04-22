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

    return (
        <div>
            <h1>Answered</h1>
            <p>...other people</p>
        </div>
    )
}

module.exports = AnsweredView;
