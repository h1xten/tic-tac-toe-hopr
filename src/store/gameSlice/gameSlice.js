import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    side: null,
    turn: null
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        gameStatus: (state, action) => {
            state.status = action.payload
        },
        setSide: (state, action) => {
            state.side = action.payload
        },
        gameTurn: (state, action) => {
            state.turn = action.payload
        },
        setMove: (state, action) => {
            state.move = action.payload
        }
    }
})
export const {gameStatus, gameTurn, setMove, setSide} = gameSlice.actions