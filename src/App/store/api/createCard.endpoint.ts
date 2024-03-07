import { ferrariApi } from './ferrari.api'
import { TypeFerrari } from './models/api.models'

const createCard = ferrariApi.injectEndpoints({
	endpoints: builder => ({
		createCard: builder.mutation<TypeFerrari, TypeFerrari>({
			query: data => ({
				url: '/cards',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: () => [{ type: 'Ferrari' }],
		}),
	}),
})

export const { useCreateCardMutation } = createCard
