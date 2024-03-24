import { message } from 'antd'

import { useEditCardMutation } from '../../store/api/cards/editCard.endpoint'
import { useGetAllFerrariQuery } from '../../store/api/ferrari.api'
import { CardItem } from '../cardItem/CardItem'
import { TypeFerrari } from '../../store/api/models/api.models'
import { memo } from 'react'

type TypeResponse = {
	searchRequest: string
	goodsProducts: (value: boolean) => void
	products: TypeFerrari[]
}

const Data = ({ searchRequest, goodsProducts, products }: TypeResponse) => {
	const { data, error } = useGetAllFerrariQuery(searchRequest)
	const [trigger] = useEditCardMutation()

	return (
		<>
			{error
				? message.error(`Error when fetching data: ${JSON.stringify(error)}`)
				: data?.map(ferrari => (
					<CardItem
						{...ferrari}
						key={ferrari.id}
						buyProduct={goodsProducts}
						products={products}
						request={trigger}
					/>
				))}
		</>
	)
}

export const Response = memo(Data, (prev, next) => prev === next)
