import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'

import { TypeAuth } from '../types/auth.types'
import { userChecker } from './userChecker.service'

export const createUser = async (
	data: Omit<TypeAuth, 'id'>,
	navigate: NavigateFunction,
	setValidate: Dispatch<SetStateAction<boolean>>
) => {
   try {
      await message.info('Verifying...')
      const isExist = await userChecker(data.email)
      if (isExist) {
         setValidate(false)
      } else {
         setValidate(true)
         navigate('/login')
         await axios.post<TypeAuth>('https://server-b2xy.onrender.com/users', data)
      }
	} catch (e) {
		throw new Error(`An error occurred while creating the user. ${e}`)
	}
}
