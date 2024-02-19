import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { typedState } from '../store'

export const useTypedSelector: TypedUseSelectorHook<typedState> = useSelector
