const { configureStore } = require('@reduxjs/toolkit');
const playerReducer = require('./reducers/playerReducer');

const store = configureStore({
    reducer: {
        player: playerReducer,
    },
});

module.exports = store;