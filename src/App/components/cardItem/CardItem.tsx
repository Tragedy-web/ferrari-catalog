import { TypeFerrariItem } from '../../../types/cardItem.types'
import { Button } from '../ui/button/Button'
import item from './styles/cardItem.module.scss'

export function CardItem({
	brand,
	price,
	image,
	purchased,
	buyProduct,
}: TypeFerrariItem) {
	const sendDataHandler = () => {
		const isExist = purchased.some(car => car.brand === brand)
		if (isExist) return
		else {
			buyProduct(true)
			purchased.push({ brand, price })
		}
	}

	return (
		<div className={item.container}>
			<div>
				<img className={`${item.img} w100`} src={image} alt='Error 404 :(' />
			</div>
			<div className={item.content}>
				<h1>{brand}</h1>
				<h2>Price: ${price}</h2>
				<Button title='Buy' sendData={sendDataHandler} />
			</div>
		</div>
	)
}
