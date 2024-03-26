import { useEffect, useState } from 'react'
import { message } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

import { TypePurchasedCard } from '../../types/purchased.types'
import item from './styles/purchasedItem.module.scss'

export function PurchasedItem({
	id,
	image,
	brand,
	price,
	products,
	setProducts,
	setAllQuantity
}: TypePurchasedCard) {
	const [quantity, setQuantity] = useState(1)

	const quantityIncrement = () => setQuantity(quantity => quantity + 1)

	const quantityDecrement = () => setQuantity(quantity => quantity - 1)

	const deleteProduct = () => {
		setProducts(products.filter(item => item.id !== id))
	}

	useEffect(() => {
		if (quantity < 1) {
			deleteProduct()
			message.info('The product was successfully removed from the cart!')
		} else setAllQuantity(quantity)
	}, [quantity])

	return (
		<div className={`${item.container} cw df jcsb aic`}>
			<div className={`${item.content} df gr10`}>
				<img className={item.preview} src={image} alt='not found' />
				<section>
					<h1>{brand}</h1>
					<h2>{price} $</h2>
				</section>
			</div>
			<div className={`${item.quantity} df gr10`}>
				<MinusOutlined onClick={quantityDecrement} />
				<span>{quantity}</span>
				<PlusOutlined onClick={quantityIncrement} />
			</div>
		</div>
	)
}
