import { TypeFerrariItem } from '../../../types/cardItem.types'
import { useDeleteProductMutation } from '../../store/api/deleteCard.endpoint'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import { Button } from '../ui/button/Button'
import item from './styles/cardItem.module.scss'

export function CardItem({
	id,
	brand,
	price,
	image,
	purchased,
	buyProduct,
}: TypeFerrariItem) {
	const { isAdmin } = useTypedSelector(state => state.auth)
	const [trigger] = useDeleteProductMutation()

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
				<section>
					<h1>{brand}</h1>
					<h2>Price: ${price}</h2>
				</section>
				<div className={`${item.btn} df gr10`}>
					<Button title='Buy' sendData={sendDataHandler} />
					{isAdmin && (
						<Button title='Delete' sendData={() => trigger(id)} />
					)}
				</div>
			</div>
		</div>
	)
}
