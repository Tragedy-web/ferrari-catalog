import { TypeFerrari } from '../App/store/api/models/api.models'

export type TPurchasedItem = Omit<TypeFerrari, 'image'>
export type TypePurchasedCard = Omit<TPurchasedItem, 'id'>
