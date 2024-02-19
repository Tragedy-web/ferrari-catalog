import { TypeFerrariApi } from '../store/api/models/ferrari.models'

export type TypeFerrariItem = Omit<TypeFerrariApi, 'id'>
