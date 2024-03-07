import { ferrariApi } from './ferrari.api'

const deleteCard = ferrariApi.injectEndpoints({
	endpoints: builder => ({
		deleteProduct: builder.mutation<null, number>({
			query: id => ({
				url: `/cards/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => [
				{
					type: 'Ferrari',
				},
			],
		}),
	}),
})

export const { useDeleteProductMutation } = deleteCard
