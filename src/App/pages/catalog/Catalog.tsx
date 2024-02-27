import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TPurchasedItem } from '../../../types/purchased.types'
import { Response } from '../../components/response/Response'
import { Layout } from '../../layout/Layout'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import { Cart } from '../../components/cart/Cart'

export function Catalog() {
	const [queryTerm, setQueryTerm] = useState('')
	const [search, setSearch] = useState('')
	const [popup, setPopup] = useState(false)
	const [purchased, setPurchased] = useState(false)
	const navigate = useNavigate()
	const user = useTypedSelector(state => state.auth.user)

	const ferraris: TPurchasedItem[] = []

	useEffect(() => {
		if (!user) navigate('/')
	}, [])

	return (
		<Layout
			postDataHandler={setQueryTerm}
			openCart={setPopup}
			search={search}
			setSearch={setSearch}
		>
			<Cart
				open={popup}
				purchased={purchased}
				purchasedProduct={ferraris}
				setOpen={setPopup}
			/>
			<Response
				purchased={ferraris}
				goodsProducts={setPurchased}
				searchRequest={queryTerm}
			/>
		</Layout>
	)
}
