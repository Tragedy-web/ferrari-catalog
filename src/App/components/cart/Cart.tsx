import { CloseOutlined } from '@ant-design/icons'
import Modal from 'antd/es/modal/Modal'

import { TPurchasedItem } from '../../../types/purchased.types'
import { PurchasedItem } from '../purchasedItem/PurchasedItem'
import cart from './styles/cart.module.scss'

type TypeCart = {
	open: boolean
	setOpen: (popup: boolean) => void
	purchased: boolean
	purchasedProduct: TPurchasedItem[]
}

export function Cart({ open, setOpen, purchased, purchasedProduct }: TypeCart) {
	return (
		<Modal
			open={open}
			title='Cart'
			closeIcon={<CloseOutlined />}
			onCancel={() => setOpen(false)}
			className={cart.modal}
			cancelButtonProps={{ style: { display: 'none' } }}
			okText='Buy'
		>
			<hr />
			{purchased
				? purchasedProduct.map(car => (
					<PurchasedItem key={car.id} brand={car.brand} price={car.price} />
				))
				: 'Товаров нет :('}
		</Modal>
	)
}
