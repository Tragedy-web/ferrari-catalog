import { TypeFerrari } from '../../App/store/api/models/api.models'

export type TypeFerrariItem = {
	request: any
	products: TypeFerrari[]
	buyProduct: (product: boolean) => void
} & TypeFerrari
