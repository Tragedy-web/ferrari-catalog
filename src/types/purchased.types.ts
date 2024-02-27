import { TypeFerrariApi } from '../App/store/api/models/ferrari.models'

export type TPurchasedItem = Omit<TypeFerrariApi, 'image'>
export type TypePurchasedCard = Omit<TPurchasedItem, 'id'>
