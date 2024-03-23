import { TypeAuth } from './auth.types'

export type TypeState = {
	identifier: number | null
} & Omit<TypeAuth, 'password' | 'id'>