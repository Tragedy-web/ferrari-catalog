import { CloudUploadOutlined } from '@ant-design/icons'
import { Modal, Spin, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { onTypingCarBrand, onTypingCarPrice } from '../../constants/regex/regex'
import { TypeFerrari } from '../../store/api/models/api.models'
import { beforeUpload, fakeRequest, getBase64 } from '../../utils/uploadAvatar'
import { Field } from '../field/Field'

type TypeCreateCard = {
	current?: number
	text: string
	placeholder: string
	open: boolean
	trigger: any
	cancelOpen: (cancel: boolean) => void
}

export function CreationPanel({
	open,
	cancelOpen,
	text,
	placeholder,
	trigger,
	current,
}: TypeCreateCard) {
	const [imageUrl, setImageUrl] = useState<string>()
	const [brand, setBrand] = useState('')
	const [price, setPrice] = useState('')
	const [brandError, setBrandError] = useState('')
	const [priceError, setPriceError] = useState('')
	const [isCorrect, setIsCorrect] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!brand || !price || !imageUrl) setIsCorrect(false)
		else if (brandError || priceError) setIsCorrect(false)
		else setIsCorrect(true)
	}, [brand, price, imageUrl, brandError, priceError])

	const updateBrand = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setBrand(e.target.value)
			if (!onTypingCarBrand.test(e.target.value))
				setBrandError('Brand is invalid')
			else setBrandError('')
		},
		[brand, setBrandError]
	)

	const updatePrice = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setPrice(e.target.value)
			if (!onTypingCarPrice.test(e.target.value))
				setPriceError('Price is invalid')
			else setPriceError('')
		},
		[price, setPriceError]
	)

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

	const createServerData: Omit<TypeFerrari, 'id'> = {
		brand,
		price: Number(price),
		image: imageUrl !== undefined ? imageUrl : '',
	}

	const updateServerData: TypeFerrari = {
		id: current,
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
			okText={text}
			onCancel={() => cancelOpen(false)}
			okButtonProps={{ disabled: !isCorrect, style: { color: '#fff' } }}
			onOk={() =>
				trigger(text === 'Create' ? createServerData : updateServerData)
			}
			open={open}
		>
			<Upload
				className='df fdc'
				name='Car Image'
				beforeUpload={beforeUpload}
				listType='picture-card'
				customRequest={fakeRequest}
				showUploadList={false}
				onChange={onUploadImage}
			>
				{imageUrl ? <img src={imageUrl} className='w100' /> : uploadButton}
			</Upload>
			<Field
				title='Brand'
				placeholder={placeholder}
				value={brand}
				changeData={updateBrand}
				type='text'
				error={brandError}
			/>
			<Field
				title='Price'
				placeholder={placeholder}
				value={price}
				changeData={updatePrice}
				type='text'
				error={priceError}
			/>
		</Modal>
	)
}
