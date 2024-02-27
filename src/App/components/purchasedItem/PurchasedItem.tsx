import { TypePurchasedCard } from '../../../types/purchased.types'
import item from './styles/purchasedItem.module.scss'

export function PurchasedItem({ brand, price }: TypePurchasedCard) {
	return (
		<div className={item.container}>
			<h1>{brand}</h1>
			<h2>{price}</h2>
		</div>
	)
}
