import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import Modal from 'antd/es/modal/Modal'
import { SetStateAction, useEffect, useState, Dispatch } from 'react'

import { TypeFerrari } from '../../store/api/models/api.models'
import { PurchasedItem } from '../purchasedItem/PurchasedItem'
import { message } from 'antd'
import cart from './styles/cart.module.scss'

type TypeCart = {
	open: boolean
	purchased: boolean
	products: TypeFerrari[]
	setProducts: Dispatch<SetStateAction<TypeFerrari[]>>
	setPurchased: Dispatch<SetStateAction<boolean>>
	setOpen: Dispatch<SetStateAction<boolean>>
}

export function Cart({
	open,
	setOpen,
	purchased,
	setPurchased,
	products,
	setProducts,
}: TypeCart) {
	const [allQuantity, setAllQuantity] = useState(1)
	const [isValid, setIsValid] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (products.length === 0) {
			setPurchased(false)
			setIsValid(false)
		}
		else setIsValid(true)
	}, [products.length])

	const onBuyHandler = () => {
		setLoading(true)
		setTimeout(() => {
			setProducts([])
			setLoading(false)
			message.success(
				'Thanks for your purchase. We\'ll be waiting for you again!'
			)
		}, 2000)
	}

	return (
		<Modal
			open={open}
			title='Cart'
			closeIcon={<CloseOutlined />}
			onCancel={() => setOpen(false)}
			cancelButtonProps={{ style: { display: 'none' } }}
			okText={
				loading ? (
					<span>
						<LoadingOutlined /> Buy
					</span>
				) : (
					'Buy'
				)
			}
			okButtonProps={{ disabled: !isValid, style: { color: '#fff' } }}
			onOk={onBuyHandler}
		>
			<hr />
			<div className={`${cart.modal} cw df fdc`}>
				<section>
					<h1 className='fz'>Your products:</h1>
				</section>
				{purchased ? (
					products.map(product => (
						<PurchasedItem
							{...product}
							key={product.id}
							products={products}
							setProducts={setProducts}
							setAllQuantity={setAllQuantity}
						/>
					))
				) : (
					<span className='fz'>Please purchase the products!</span>
				)}
				<div className={cart.fullPrice}>
					<span className='fz'>
						Total:{' '}
						{products.reduce((acc, item) => acc + item.price * allQuantity, 0)}$
					</span>
				</div>
			</div>
		</Modal>
	)
}
