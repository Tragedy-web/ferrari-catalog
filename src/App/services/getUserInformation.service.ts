import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'

import { UserInformationType } from '../types/userInfo.types'
import { userInformation } from '../store/slices/user.slice'

export const getUserInformation = async (id: number, dispatch: Dispatch) => {
	try {
		const { data } = await axios.get<UserInformationType[]>(
			`https://server-b2xy.onrender.com/users?id=${id}`
		)
		if (data[0]) {
			dispatch(userInformation(data[0]))
		}
	} catch (e) {
		throw new Error(`Error on getting user avatar. ${e}`)
	}
}
