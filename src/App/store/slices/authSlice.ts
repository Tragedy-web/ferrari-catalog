import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TypeAuth, TypeInitialState } from '../../types/authSlice.types.ts'

const initialState: TypeInitialState = {
	user: null,
	error: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		sucessAuth: (state, action: PayloadAction<TypeAuth>) => {
			state.user = action.payload
		},
	},
})

export const { sucessAuth } = authSlice.actions
export const authReducer = authSlice.reducer
