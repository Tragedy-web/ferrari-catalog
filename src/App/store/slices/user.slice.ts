import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TypeState } from '../../types/userSlice.types'
import { UserInformationType } from '../../types/userInfo.types'

const initialState: TypeState = {
	identifier: null,
	email: '',
	avatar: '',
	isAdmin: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userInformation: (state, {payload: information}: PayloadAction<UserInformationType>) => {
			state.identifier = information.id
			state.email = information.email
			state.avatar = information.avatar
			state.isAdmin = information.isAdmin
		},
	},
})

export const { userInformation } = userSlice.actions
export default userSlice.reducer
