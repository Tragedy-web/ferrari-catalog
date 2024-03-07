import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TypeFerrari } from './models/api.models'

const api_url = 'https://server-b2xy.onrender.com'

export const ferrariApi = createApi({
	reducerPath: 'ferrariApi',
	tagTypes: ['Ferrari'],
	baseQuery: fetchBaseQuery({ baseUrl: api_url }),
	endpoints: builder => ({
		getAllFerrari: builder.query<TypeFerrari[], string>({
			query: parameter =>
				parameter === '' ? '/cards' : `/cards?brand=${parameter}`,
			providesTags: () => [
				{
					type: 'Ferrari',
				},
			],
		}),
	}),
})

export const { useGetAllFerrariQuery } = ferrariApi