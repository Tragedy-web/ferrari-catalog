import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TPurchasedItem } from '../../../types/purchased.types'
import { Response } from '../../components/response/Response'
import { Layout } from '../../layout/Layout'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import { Cart } from '../../components/cart/Cart'
import { CreateCard } from '../../components/createCard/createCard'

export function Catalog() {
	const [queryTerm, setQueryTerm] = useState('')
	const [search, setSearch] = useState('')
	const [popup, setPopup] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [purchased, setPurchased] = useState(false)
	const navigate = useNavigate()
	const { user } = useTypedSelector(state => state.auth)

	const ferraris: TPurchasedItem[] = []

	useEffect(() => {
		if (!user) navigate('/')
	}, [])

	return (
		<Layout
			setCreatorOpen={setIsOpen}
			search={search}
			setSearch={setSearch}
			setQueryTerm={setQueryTerm}
			openCart={setPopup}
		>
			<Cart
				open={popup}
				purchased={purchased}
				purchasedProduct={ferraris}
				setOpen={setPopup}
			/>
			<CreateCard
				open={isOpen}
				cancelOpen={setIsOpen}
			/>
			<Response
				searchRequest={queryTerm}
				purchased={ferraris}
				goodsProducts={setPurchased}
			/>
		</Layout>
	)
}
