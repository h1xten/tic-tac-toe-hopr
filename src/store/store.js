import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { peerApi } from './peerSlice/peerApi';
import { peerSlice } from './peerSlice/peerSlice';

const rootReducer = combineReducers({
    [peerApi.reducerPath]: peerApi.reducer,
    [peerSlice.name]: peerSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(peerApi.middleware)
})

setupListeners(store.dispatch)
