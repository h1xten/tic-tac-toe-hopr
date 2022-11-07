import { createSlice } from "@reduxjs/toolkit";
import { getParam } from "../../utils/urlParams";

const initialState = {
    status: null,
    hoprAddress: null,
    nodeApi: 'http://localhost:13301',
    securityToken: '^^LOCAL-testing-123^^',
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
        setHoprAddress: (state, action) => {
            state.hoprAddress = action.payload
        },
        setNodeApi: (state, action) => {
            state.nodeApi = action.payload
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
export const {setMyStatus, setHoprAddress, setNodeApi, setSecurityToken, setOpponent, setMyNumber, setOpponentNumber} = peerSlice.actions

export const selectSecurityToken = (state) => state.router.location ? (getParam(state.router.location, 'apiToken') || '') : state.peer.securityToken
export const selectNodeApi = (state) => state.router.location ? (getParam(state.router.location, 'apiEndpoint') || '') : state.peer.nodeApi