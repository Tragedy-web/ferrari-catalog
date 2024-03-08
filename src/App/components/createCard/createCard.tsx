import { CloudUploadOutlined } from '@ant-design/icons'
import { Modal, Spin, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'

import { onTypingCarBrand, onTypingCarPrice } from '../../constants/regex/regex'
import { useCreateCardMutation } from '../../store/api/createCard.endpoint'
import { TypeFerrari } from '../../store/api/models/api.models'
import { beforeUpload, getBase64 } from '../../utils/uploadAvatar'
import { Field } from '../field/Field'

type TypeCard = {
	open: boolean
	cancelOpen: (cancel: boolean) => void
}

function NewCard({ open, cancelOpen }: TypeCard) {
	const [imageUrl, setImageUrl] = useState<string>()
	const [brand, setBrand] = useState('')
	const [price, setPrice] = useState('')
	const [brandError, setBrandError] = useState('')
	const [priceError, setPriceError] = useState('')
	const [isCorrect, setIsCorrect] = useState(false)
	const [loading, setLoading] = useState(false)
	const [trigger] = useCreateCardMutation()

	useEffect(() => {
		if (!brand || !price || !imageUrl) setIsCorrect(false)
		else if (brandError || priceError) setIsCorrect(false)
		else setIsCorrect(true)
	}, [brand, price, imageUrl, brandError, priceError])

	const updateBrand = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setBrand(e.target.value)
		if (!onTypingCarBrand.test(e.target.value))
			setBrandError('Введите корректное название')
		else setBrandError('')
	}, [brand, setBrandError])

	const updatePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value)
		if (!onTypingCarPrice.test(e.target.value))
			setPriceError('Введите корректные данные')
		else setPriceError('')
	}, [price, setPriceError])

	const onUploadImage: UploadProps['onChange'] = useCallback(
		({ file: info }: any) => {
			if (info.status === 'uploading') {
				setLoading(true)
				return
			}
			if (info.status === 'done') {
				setLoading(false)
				getBase64(info.originFileObj as RcFile, url => {
					setLoading(false)
					setImageUrl(url)
				})
			}
		},
		[loading, imageUrl]
	)

	const updateServerData: TypeFerrari = {
		id: Math.floor(Math.random() * 350),
		brand,
		price: Number(price),
		image: imageUrl !== undefined ? imageUrl : '',
	}

	const uploadButton = (
		<button className='df aic cw'>
			{loading ? (
				<Spin size='large' />
			) : (
				<CloudUploadOutlined style={{ fontSize: '3em' }} />
			)}
		</button>
	)

	return (
		<Modal
			cancelButtonProps={{ style: { display: 'none' } }}
			okText='Create'
			onCancel={() => cancelOpen(false)}
			okButtonProps={{ disabled: !isCorrect, style: { color: '#fff' } }}
			onOk={() => trigger(updateServerData)}
			open={open}
		>
			<Upload
				className='df fdc'
				name='Car Image'
				beforeUpload={beforeUpload}
				listType='picture-card'
				action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
				showUploadList={false}
				onChange={onUploadImage}
			>
				{imageUrl ? <img src={imageUrl} className='w100' /> : uploadButton}
			</Upload>
			<Field
				title='Brand'
				placeholder='Car Name'
				value={brand}
				changeData={updateBrand}
				type='text'
				error={brandError}
			/>
			<Field
				title='Price'
				placeholder='Car Price'
				value={price}
				changeData={updatePrice}
				type='text'
				error={priceError}
			/>
		</Modal>
	)
}

export const CreateCard = memo(NewCard, (prev, next) => prev === next)
