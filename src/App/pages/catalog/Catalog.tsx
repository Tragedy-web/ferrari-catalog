import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Cart } from '../../components/cart/Cart'
import { CreationPanel } from '../../components/creationPanel/CreationPanel'
import { Response } from '../../components/response/Response'
import { Layout } from '../../layout/Layout'
import { useCreateCardMutation } from '../../store/api/cards/createCard.endpoint'
import { TypeFerrari } from '../../store/api/models/api.models'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { getUserInformation } from '../../services/getUserInformation.service'

export function Catalog() {
	const id = Number(localStorage.getItem('key'))
	const dispatch = useTypedDispatch()
	const [queryTerm, setQueryTerm] = useState('')
	const [popup, setPopup] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [purchased, setPurchased] = useState(false)
	const [ferraris, setFerraris] = useState<TypeFerrari[]>([])
	const navigate = useNavigate()
	const [trigger] = useCreateCardMutation()

	useEffect(() => {
		if (id) getUserInformation(id, dispatch)
		else navigate('/')
	}, [])

	return (
		<Layout
			setPanelOpen={setIsOpen}
			setQueryTerm={setQueryTerm}
			openCart={setPopup}
		>
			<Cart
				open={popup}
				purchased={purchased}
				setPurchased={setPurchased}
				setOpen={setPopup}
				products={ferraris}
				setProducts={setFerraris}
			/>
			<CreationPanel
				open={isOpen}
				placeholder='Create Car'
				text='Create'
				trigger={trigger}
				cancelOpen={setIsOpen}
			/>
			<Response
				products={ferraris}
				searchRequest={queryTerm}
				goodsProducts={setPurchased}
			/>
		</Layout>
	)
}