import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CardItem } from '../../components/cardItem/CardItem'
import { Layout } from '../../layout/Layout'
import { useGetAllFerrariQuery } from '../../store/api/ferrari.api'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'

export function FerrariCatalog() {
	const navigate = useNavigate()
	const user = useTypedSelector(state => state.auth.user)
	const { data, error } = useGetAllFerrariQuery(null)

	useEffect(() => {
		if (!user) navigate('/')
	}, [])

	return (
		<Layout>
			{error
				? 'Oops.. Something went wrong'
				: data?.map(ferrari => (
						<CardItem
							key={ferrari.id}
							brand={ferrari.brand}
							image={ferrari.image}
							price={ferrari.price}
						/>
				  ))}
		</Layout>
	)
}
