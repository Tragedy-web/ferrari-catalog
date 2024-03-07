import { EditOutlined } from '@ant-design/icons'
import { Spin, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { beforeUpload, getBase64 } from '../../utils/uploadAvatar'

import { Button } from '../../components/ui/button/Button'
import { Navigate } from '../../components/ui/navigate/Navigate'
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import { userAvatar } from '../../store/slices/userSlice'
import profile from './styles/profile.module.scss'

export function Profile() {
	const [avatarUrl, setAvatarUrl] = useState<string>()
	const [loading, setLoading] = useState(false)

	const { user } = useTypedSelector(state => state.auth)
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/')
		}
	}, [])

	const avatarChange: UploadProps['onChange'] = useCallback(
		({ file: info }: any) => {
			if (info.status === 'uploading') {
				setLoading(true)
				return
			}
			if (info.status === 'done') {
				getBase64(info.originFileObj as RcFile, url => {
					setLoading(false)
					setAvatarUrl(url)
				})
			}
		},
		[avatarUrl, loading]
	)

	const saveAvatarHandler = () => {
		dispatch(userAvatar(avatarUrl))
		navigate('/catalog')
	}

	const uploadButton = (
		<button className='df aic cw'>
			{loading ? (
				<Spin size='large' />
			) : (
				<EditOutlined style={{ fontSize: '3em' }} />
			)}
		</button>
	)

	return (
		<main className={`${profile.container} df jcc aic`}>
			<div className={profile.content}>
				<section className='cw'>
					<Upload
						name='avatar'
						listType='picture-circle'
						action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
						showUploadList={false}
						beforeUpload={beforeUpload}
						onChange={avatarChange}
					>
						{avatarUrl ? (
							<img className={profile.avatar} src={avatarUrl} />
						) : (
							uploadButton
						)}
					</Upload>
					<div>
						<h1>Email: {user?.email}</h1>
					</div>
				</section>
				<div className={`${profile.navigate} df jcsb aic cw`}>
					<Button title='Save' sendData={saveAvatarHandler} />
					<Navigate title='Back' navigate='/catalog' />
				</div>
			</div>
		</main>
	)
}
