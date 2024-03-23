import { ferrariApi } from '../ferrari.api'
import { TypeFerrari } from '../models/api.models'

const editCard = ferrariApi.injectEndpoints({
	endpoints: builder => ({
		editCard: builder.mutation<null, TypeFerrari>({
			query: ({id, ...data}) => ({
				url: `/cards/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: () => [
				{
					type: 'Ferrari',
				},
			],
		}),
	}),
})

export const { useEditCardMutation } = editCard
