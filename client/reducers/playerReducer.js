const { createSlice } = require('@reduxjs/toolkit');

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        name: 'nullPlayer',
        id: null,
        totalScore: 0,
        answered: false,
        exited: false,
        roundsSurvived: 0,
        perfect: true,
    },
    reducers: {
        setPlayer: (state, action) => {
            return { ...state, ...action.payload }; // Update the entire player object
        },
        resetPlayer: (state) => {
            state.name = 'Player';
            state.id = null;
            state.totalScore = 0;
            state.answered = false;
            state.exited = false;
            state.roundsSurvived = 0;
            state.perfect = true;
        },
        setName: (state, action) => {
            state.name = action.payload; // Update only the name property
        },
    },
});

module.exports = playerSlice.reducer;
module.exports.playerActions = playerSlice.actions;