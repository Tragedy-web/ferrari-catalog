import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from 'react'

import { admin_token } from './token_regex/token.regex'
import { Button } from '../../components/ui/button/Button'
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch'
import { adminAuth } from '../../store/slices/authSlice'
import admin from './styles/token.module.scss'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import { Field } from '../../components/field/Field'

export function AdminPanel() {
	const [token, setToken] = useState('')
	const [error, setError] = useState('')
	const [redirectError, setRedirectError] = useState('')
	const [valid, setValid] = useState(false)
	
	const user = useTypedSelector(state => state.auth.user)
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
		dispatch(adminAuth({ isAdmin: token }))
		navigate('/catalog')
	}

	return (
		<div className={`${admin.container} df jcc aic`}>
			<div className={admin.content}>
				<Field
					title='Token'
					type='text'
					placeholder='AAAAZzzZBbbBCCCc'
					value={token}
					changeData={onChangeHandler}
					error={error || redirectError}
				/>
				<div className={`${admin.validate} df jcsb aic`}>
					<Button
						title='Auth'
						isDisabled={!valid}
						sendData={authAdminHandler}
					/>
					<Link
						className={admin.redirect}
						to={redirectError ? '/' : '/catalog'}
					>
						Back
					</Link>
				</div>
			</div>
		</div>
	)
}
