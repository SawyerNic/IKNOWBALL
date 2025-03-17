const { gameModel } = require('../models');

const singlePlayer = (req, res) => res.render('singlePlayer');

const game = new gameModel();

const addPlayer = (req, res) => {
    
}



module.exports = {
    singlePlayer
}