import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {authReducer} from './slices/authSlice.ts';

export const rootReducer = combineReducers({
   authReducer
})

export const store = configureStore({
   reducer: rootReducer
})

export type typedRootReducer = ReturnType<typeof rootReducer>
export type typedState = ReturnType<typeof store.getState>;
export type typedDispatch = typeof store.dispatch;