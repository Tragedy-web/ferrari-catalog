import { TypeFerrariApi } from '../App/store/api/models/api.models'

export type TPurchasedItem = Omit<TypeFerrariApi, 'image'>
export type TypePurchasedCard = Omit<TPurchasedItem, 'id'>
