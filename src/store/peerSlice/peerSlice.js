import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    securityToken: null,
    opponent: {
        address: null,
    }
}

export const peerSlice = createSlice({
    name: 'peer',
    initialState,
    reducers: {
        setHorpAddress: (state, action) => {
            state.hoprAddress = action.payload
        },
        setOpponent: (state, action) => {
            state.opponent.address = action.payload
        },
        setSecurityToken: (state, action) => {
            state.securityToken = action.payload
        }
    }
})
export const {setHorpAddress, setSecurityToken, setOpponent} = peerSlice.actions