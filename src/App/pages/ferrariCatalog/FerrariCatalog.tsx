import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../layout/Layout'
import { useTypedSelector } from '../../store/hooks/typedHooks'

export function FerrariCatalog() {
	const navigate = useNavigate()
	const { user } = useTypedSelector(state => state.authReducer)

	useEffect(() => {
		if (!user) navigate('/')
	}, [user])

	return <Layout>111212</Layout>
}
