import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TypeFerrariApi } from './models/ferrari.models'

const api_url = 'http://localhost:4200'

export const ferrariApi = createApi({
	reducerPath: 'ferrariApi',
	tagTypes: ['Ferrari'],

	baseQuery: fetchBaseQuery({ baseUrl: api_url }),
	endpoints: builder => ({
		getAllFerrari: builder.query<TypeFerrariApi[], null>({
			query: () => `/cards`,
		}),
	}),
})

export const { useGetAllFerrariQuery } = ferrariApi
