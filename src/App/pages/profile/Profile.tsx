import { EditOutlined } from '@ant-design/icons'
import { Spin, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { beforeUpload, getBase64 } from '../../utils/uploadAvatar'

import { Button } from '../../components/ui/button/Button'
import { Navigate } from '../../components/ui/navigate/Navigate'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { saveAvatar } from '../../services/saveAvatar.service'
import { TUserAvatar } from '../../types/profile.types.ts'
import profile from './styles/profile.module.scss'
import { getUserInformation } from '../../services/getUserInformation.service.ts'
import { useTypedDispatch } from '../../hooks/useTypedDispatch.ts'

export function Profile() {
	const navigate = useNavigate()
	const authToken = Number(localStorage.getItem('key'))
	const dispatch = useTypedDispatch()
	const { identifier, email, avatar } = useTypedSelector(state => state.user)
	const [avatarUrl, setAvatarUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [valid, setValid] = useState(false)

	useEffect(() => {
		if (authToken) {
			getUserInformation(authToken, dispatch)
		} else navigate('/')
	}, [])

	useEffect(() => {
		if (avatarUrl.length === 0) setValid(false)
		else setValid(true)
	}, [avatarUrl.length])

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

	const uploadButton = (
		<button className='df aic cw'>
			{loading ? (
				<Spin size='large' />
			) : (
				<EditOutlined style={{ fontSize: '3em' }} />
			)}
		</button>
	)

	const avatarHandler = () => {
		if (identifier) {
			const avatarToken: TUserAvatar = { avatar: avatarUrl }
			saveAvatar(identifier, avatarToken, navigate)
		}
	}

	return (
		<main className={`${profile.container} df jcc aic`}>
			<div className={profile.content}>
				<section className='cw'>
					<Upload
						name='avatar'
						listType='picture-circle'
						action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
						showUploadList={false}
						beforeUpload={beforeUpload}
						onChange={avatarChange}
					>
						{avatarUrl ? (
							<img className={profile.avatar} src={avatarUrl} />
						) : avatar ? (
							<img src={avatar} className={profile.avatar} />
						) : (
							uploadButton
						)}
					</Upload>
					<div>
						<h1 className='rcsf'>Email: {email}</h1>
					</div>
				</section>
				<div className={`${profile.navigate} df jcsb aic cw`}>
					<Button title='Save' isDisabled={!valid} sendData={avatarHandler} />
					<Navigate title='Back' navigate='/catalog' />
				</div>
			</div>
		</main>
	)
}
