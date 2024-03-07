import { ferrariApi } from './ferrari.api'

type SuccessDelete = {
	success: boolean
}

const deleteCard = ferrariApi.injectEndpoints({
	endpoints: builder => ({
		deleteProduct: builder.mutation<SuccessDelete, number>({
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
