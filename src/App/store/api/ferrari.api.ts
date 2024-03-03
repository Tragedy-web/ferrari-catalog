import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TypeFerrariApi } from './models/ferrari.models'

const api_url = 'https://server-b2xy.onrender.com'

export const ferrariApi = createApi({
	reducerPath: 'ferrariApi',
	tagTypes: ['Ferrari'],
	baseQuery: fetchBaseQuery({ baseUrl: api_url }),
	endpoints: builder => ({
		getAllFerrari: builder.query<TypeFerrariApi[], string>({
			query: parameter => parameter === '' ? '/cards' : `/cards?brand=${parameter}`
		}),
	}),
})

export const { useGetAllFerrariQuery } = ferrariApi
