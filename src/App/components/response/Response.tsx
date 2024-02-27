import { TPurchasedItem } from '../../../types/purchased.types'
import { useGetAllFerrariQuery } from '../../store/api/ferrari.api'
import { CardItem } from '../cardItem/CardItem'

type TypeResponse = {
	searchRequest: string
	purchased: TPurchasedItem[]
	goodsProducts: (value: boolean) => void
}

export function Response({ searchRequest, purchased, goodsProducts }: TypeResponse) {
	const { data, error } = useGetAllFerrariQuery(searchRequest)
	return (
		<>
			{error
				? 'Oops.. Something went wrong'
				: data?.map(ferrari => (
						<CardItem
							key={ferrari.id}
							brand={ferrari.brand}
							image={ferrari.image}
							price={ferrari.price}
							buyProduct={goodsProducts}
							purchased={purchased}
						/>
				))}
		</>
	)
}