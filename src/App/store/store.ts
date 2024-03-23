import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/user.slice.ts'
import { ferrariApi } from './api/ferrari.api.ts'

export const store = configureStore({
	reducer: {
		user: userReducer,
		[ferrariApi.reducerPath]: ferrariApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(ferrariApi.middleware),
})

export type typedState = ReturnType<typeof store.getState>
export type typedDispatch = typeof store.dispatch