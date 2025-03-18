const { Player } = require('../models');

const singlePlayer = (req, res) => res.render('singlePlayer');


const addPlayer = (req, res) => {

    const player = new Player();

    game.addPlayer()
}



module.exports = {
    singlePlayer
}