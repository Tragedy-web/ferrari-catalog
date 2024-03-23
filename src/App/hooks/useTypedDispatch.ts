import { useDispatch } from 'react-redux'
import { typedDispatch } from '../store/store'

export const useTypedDispatch = () => useDispatch<typedDispatch>()
