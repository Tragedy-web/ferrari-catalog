import { TypePurchasedCard } from './purchased.types'

export type TypeFerrariItem = {
	brand: string
	price: number
	image: string
	buyProduct: (value: boolean) => void
	purchased: TypePurchasedCard[]
}
