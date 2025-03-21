const { gameModel } = require('./gameModel.js');
const { Player } = require('./playerModel.js');
const { Question, Option } = require('./questionModel.js');

module.exports = {
    Question,
    Option,
    gameModel,
    Player
}