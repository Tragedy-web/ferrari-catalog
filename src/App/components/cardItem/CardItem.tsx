import { EditOutlined } from '@ant-design/icons'
import { Skeleton, message } from 'antd'
import { useState } from 'react'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { TypeFerrariItem } from '../../types/cardItem.types'
import { CreationPanel } from '../creationPanel/CreationPanel'
import { Button } from '../ui/button/Button'
import item from './styles/cardItem.module.scss'
import { useDeleteProductMutation } from '../../store/api/cards/deleteCard.endpoint'

export function CardItem({
	id,
	brand,
	price,
	image,
	buyProduct,
	products,
	request,
}: TypeFerrariItem) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [edit, setEdit] = useState(false)
	const { isAdmin } = useTypedSelector(state => state.user)
	const [trigger] = useDeleteProductMutation()

	const sendDataHandler = () => {
		const isExist = products.some(item => item.brand === brand)
		if (isExist) return
		else {
			buyProduct(true)
			products.push({ id, brand, price, image })
			message.success('Product added to cart!')
		}
	}

	return (
		<>
			<CreationPanel
				current={id}
				open={edit}
				cancelOpen={setEdit}
				text='Edit'
				placeholder='Edit Car'
				trigger={request}
			/>
			<div className={`${item.container} rcsf`}>
				{isAdmin && (
					<div onClick={() => setEdit(true)} className={item.edit}>
						<EditOutlined className={item.icon} />
					</div>
				)}
				<div>
					<img
						className={`${item.img} w100`}
						onLoad={() => setIsLoaded(true)}
						src={image}
						alt='Error 404 :('
					/>
					{!isLoaded && (
						<Skeleton.Image active={true} className={item.skeleton} />
					)}
				</div>
				<div className={item.content}>
					<section>
						<h2>{brand}</h2>
						<span>Price: ${price}</span>
					</section>
					<div className={`${item.btn} df gr10`}>
						<Button title='Buy' sendData={sendDataHandler} />
						{isAdmin && (
							<Button title='Delete' sendData={() => id && trigger(id)} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}
