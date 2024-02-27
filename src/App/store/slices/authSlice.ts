import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	TypeAdminAuth,
	TypeAuth,
	TypeInitialState,
} from '../types/authSlice.types'

const initialState: TypeInitialState = {
	user: null,
	error: null,
	isAdmin: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		sucessAuth: (state, action: PayloadAction<TypeAuth>) => {
			state.user = action.payload
		},
		adminAuth: (state, action: PayloadAction<TypeAdminAuth>) => {
			state.isAdmin = action.payload
		},
	},
})

export const { sucessAuth, adminAuth } = authSlice.actions
export const authReducer = authSlice.reducer
