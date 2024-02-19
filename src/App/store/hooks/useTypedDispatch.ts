import { useDispatch } from 'react-redux'
import { typedDispatch } from '../store'

export const useTypedDispatch = () => useDispatch<typedDispatch>()
