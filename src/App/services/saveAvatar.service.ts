import axios from 'axios'
import { NavigateFunction } from 'react-router-dom'
import { message } from 'antd'

import { TUserAvatar } from "../types/profile.types.ts";

export const saveAvatar = async (
   id: number,
   data: TUserAvatar,
   navigate: NavigateFunction
) => {
   try {
      message.info('Updating...')
      await axios.patch<TUserAvatar>(
         `https://server-b2xy.onrender.com/users/${id}`, data
      )
      navigate('/catalog')
   } catch (e) {
      throw new Error(`An Error was occured when saving data. ${e}`)
   }
}
