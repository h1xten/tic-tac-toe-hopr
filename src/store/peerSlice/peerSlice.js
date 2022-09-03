import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    securityToken: '^^LOCAL-testing-123^^',
    opponent: {
        address: null,
    }
}

export const peerSlice = createSlice({
    name: 'peer',
    initialState,
    reducers: {
        setOpponent: (state, action) => {
            state.opponent.address = action.payload
        },
        setSecurityToken: (state, action) => {
            state.securityToken = action.payload
        }
    }
})