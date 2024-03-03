import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TypeUserAction, TypeUserState } from '../types/userSlice.types'

const initialState: TypeUserState = {
	avatar: undefined,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userAvatar: (state, { payload: image }: PayloadAction<TypeUserAction>) => {
			state.avatar = image
		},
	},
})

export const { userAvatar } = userSlice.actions
export const userReducer = userSlice.reducer
