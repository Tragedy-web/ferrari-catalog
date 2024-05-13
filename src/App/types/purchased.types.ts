import { Dispatch, SetStateAction } from 'react'
import { TypeFerrari } from '../../App/store/api/models/api.models'

export type TypePurchasedCard = {
	products: TypeFerrari[]
	setProducts: Dispatch<SetStateAction<TypeFerrari[]>>
	setTotal: Dispatch<SetStateAction<number>>
} & TypeFerrari
