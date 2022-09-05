import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    securityToken: null,
    randNumber: null,
    opponent: {
        address: null,
        randNumber: null
    },
    error: null,
}

export const peerSlice = createSlice({
    name: 'peer',
    initialState,
    reducers: {
        setMyStatus: (state, action) => {
            state.status = action.payload
        },
        setSecurityToken: (state, action) => {
            state.securityToken = action.payload
        },
        setOpponent: (state, action) => {
            state.opponent.address = action.payload
        },
        setMyNumber: (state, action) => {
            state.randNumber = action.payload
        },
        setOpponentNumber: (state, action) => {
            state.opponent.randNumber = action.payload
        }
    }
})
export const {setMyStatus, setSecurityToken, setOpponent, setMyNumber, setOpponentNumber} = peerSlice.actions