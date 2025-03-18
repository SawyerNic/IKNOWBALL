const { gameModel, Player } = require('../models');

const singlePlayer = (req, res) => res.render('singlePlayer');

const game = new gameModel();


const addPlayer = (req, res) => {

    const player = new Player();

    game.addPlayer()
}



module.exports = {
    singlePlayer
}