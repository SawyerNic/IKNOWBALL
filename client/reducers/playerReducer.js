const { createSlice } = require('@reduxjs/toolkit');

const playerSlice = createSlice({
    name: 'player',
    initialState: {
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
            state.place = 0;
        },
        setName: (state, action) => {
            state.name = action.payload; // Update only the name property
        },
        setAnswered: (state, action) => {
            state.answered = action.payload;
        },
        setPerfect: (state, action) => {
            state.perfect = action.payload;
        }
    },
});

module.exports = playerSlice.reducer;
module.exports.playerActions = playerSlice.actions;