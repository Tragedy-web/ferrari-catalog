import { TypeFerrariApi } from '../App/store/api/models/api.models'
import { TypePurchasedCard } from './purchased.types'

export type TypeFerrariItem = {
	buyProduct: (product: boolean) => void
	purchased: TypePurchasedCard[]
} & TypeFerrariApi
