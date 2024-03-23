import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { message } from 'antd'

import { TypeAuth } from '../types/auth.types'

export const getUser = async (
	request: string,
	storage: Dispatch<SetStateAction<TypeAuth | undefined>>,
	setValidate: Dispatch<SetStateAction<boolean>>
) => {
	try {
		const response = await axios.get<TypeAuth[]>(
			`https://server-b2xy.onrender.com/users?email=${request}`
		)
		if (!response.data[0]) {
			message.error('User not found. Please, register.')
			setValidate(false)
		} else {
			await storage(response.data[0])
		}
	} catch (e) {
		throw new Error(`Error on getting user data. ${e}`)
	}
}
