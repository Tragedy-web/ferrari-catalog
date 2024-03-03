import { configureStore } from '@reduxjs/toolkit'
import { ferrariApi } from './api/ferrari.api.ts'
import { authReducer } from './slices/authSlice.ts'
import { userReducer } from './slices/userSlice.ts'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		[ferrariApi.reducerPath]: ferrariApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(ferrariApi.middleware),
})

export type typedState = ReturnType<typeof store.getState>
export type typedDispatch = typeof store.dispatch