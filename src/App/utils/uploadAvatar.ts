import { message } from 'antd'
import { RcFile } from 'antd/es/upload'

export const getBase64 = (image: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(image)
}

export const beforeUpload = (file: RcFile) => {
	const correctFileFormat =
		file.type === 'image/jpeg' || file.type === 'image/png'

	if (!correctFileFormat) message.error('You can only upload JPG/PNG file!')

	const correctSize = file.size / 1024 / 1024 < 2

	if (!correctSize) message.error('Image must smaller than 2MB!')

	return correctFileFormat && correctSize
}

export const fakeRequest = ({ onSuccess }: { onSuccess?: any }) => {
	setTimeout(() => {
		onSuccess('ok')
	}, 0)
}
