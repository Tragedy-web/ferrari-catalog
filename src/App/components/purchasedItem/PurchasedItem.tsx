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
	setTotal
}: TypePurchasedCard) {
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		setTotal(prev => prev + price);
	}, []);

	useEffect(() => {
		if (quantity < 1) {
			setProducts(products.filter(item => item.id !== id))
			message.info('The product was successfully removed from the cart!')
		}
	}, [quantity])

	const quantityIncrement = () => {
		setQuantity(quantity => quantity + 1)
		setTotal(prev => prev + price)
	}

	const quantityDecrement = () => {
		setQuantity(quantity => quantity - 1)
		setTotal(prev => prev - price)
	}

	return (
		<div className={`${item.container} cw df jcsb aic`}>
			<div className={`${item.content} df gr10`}>
				<img className={item.preview} src={image} alt='not found' />
				<section>
					<h2>{brand}</h2>
					<span>{price} $</span>
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
