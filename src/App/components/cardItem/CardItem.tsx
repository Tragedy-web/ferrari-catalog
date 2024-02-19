import { TypeFerrariItem } from '../../types/ferrari.types'
import item from './styles/cardItem.module.scss'

export function CardItem({ brand, price, image }: TypeFerrariItem) {
	return (
		<div className={item.container}>
			<div>
				<img className={`${item.img} w100`} src={image} alt='Error 404 :(' />
			</div>
			<div className={item.content}>
				<h1>{brand}</h1>
				<h2>Price: ${price}</h2>
				<button>Buy</button>
			</div>
		</div>
	)
}
