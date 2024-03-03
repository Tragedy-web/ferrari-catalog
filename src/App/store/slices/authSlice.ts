import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	TypeAuth,
	TypeInitialState,
} from '../types/authSlice.types'

const initialState: TypeInitialState = {
	user: null,
	isAdmin: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		sucessAuth: (state, action: PayloadAction<TypeAuth>) => {
			state.user = action.payload
		},
		adminAuth: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload
		},
	},
})

export const { sucessAuth, adminAuth } = authSlice.actions
export const authReducer = authSlice.reducer
