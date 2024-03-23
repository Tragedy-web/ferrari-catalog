import { TypeAuth } from './auth.types'

export type UserInformationType = Omit<TypeAuth, 'password'>