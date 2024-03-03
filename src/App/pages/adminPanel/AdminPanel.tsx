import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import admin from './styles/token.module.scss'
import { admin_token } from './token_regex/token.regex'
import { Field } from '../../components/field/Field'
import { Button } from '../../components/ui/button/Button'
import { Navigate } from '../../components/ui/navigate/Navigate'
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import { adminAuth } from '../../store/slices/authSlice'

export function AdminPanel() {
	const [token, setToken] = useState('')
	const [error, setError] = useState('')
	const [redirectError, setRedirectError] = useState('')
	const [valid, setValid] = useState(false)

	const { user } = useTypedSelector(state => state.auth)
	const navigate = useNavigate()
	const dispatch = useTypedDispatch()

	useEffect(() => {
		if (!user) setRedirectError('Пользователь не найден. Зарегистрируйтесь')
		else if (!token || error || redirectError) setValid(false)
		else setValid(true)
	}, [token, error])

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value)
		if (!admin_token.test(e.target.value)) setError('Ваш токен недействителен')
		else setError('')
	}

	const authAdminHandler = () => {
		dispatch(adminAuth(true))
		navigate('/catalog')
	}

	return (
		<main className={`${admin.container} df jcc aic`}>
			<div className={admin.content}>
				<Field
					title='Token'
					type='text'
					placeholder='AAAAZzzZBbbBCCCc'
					value={token}
					changeData={onChangeHandler}
					error={error || redirectError}
				/>
				<div className={`${admin.validate} df jcsb aic cw`}>
					<Button
						title='Auth'
						isDisabled={!valid}
						sendData={authAdminHandler}
					/>
					<Navigate title='Back' navigate={redirectError ? '/' : '/catalog'} />
				</div>
			</div>
		</main>
	)
}
