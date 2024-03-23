import axios from 'axios'

import { TypeAuth } from '../types/auth.types'
import { message } from 'antd'

export const userChecker = async (info: string): Promise<any> => {
	try {
		const response = await axios.get<TypeAuth[]>(
			`https://server-b2xy.onrender.com/users?email=${info}`
		)
		if (response.data[0]) {
			return message.error('User has already existed')
		}
	} catch (e) {
		throw new Error(`Ошибка при проверке пользователя: ${e}`)
	}
}
