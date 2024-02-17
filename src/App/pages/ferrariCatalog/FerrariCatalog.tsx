import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../layout/Layout'
import { useTypedSelector } from '../../store/hooks/typedHooks'
import { Grid } from 'antd'

export function FerrariCatalog() {
	const navigate = useNavigate()
	const { user } = useTypedSelector(state => state.authReducer)

	useEffect(() => {
		if (!user) navigate('/')
	}, [user])

	return <Layout>111212</Layout>
}
