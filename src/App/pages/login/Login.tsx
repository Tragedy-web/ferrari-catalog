import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useTypedSelector } from '../../store/hooks/typedHooks'
import login from './styles/login.module.scss'
import { Button } from '../../components/ui/button/Button'

export function Login() {
	const { user } = useTypedSelector(state => state.authReducer)
	const navigate = useNavigate()
	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [loginEmailError, setLoginEmailError] = useState('')
	const [loginPasswordError, setLoginPasswordError] = useState('')
	const [valid, setValid] = useState(false)

	useEffect(() => {
		if (!loginEmail || !loginPassword) {
			setValid(false)
		} else if (loginEmailError || loginPasswordError) {
			setValid(false)
		} else setValid(true)
	}, [loginEmail, loginPassword])

	const loginEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginEmail(e.target.value)
		if (e.target.value !== user?.email) {
			setLoginEmailError('Данные не совпадают. Проверьте ваш email')
		} else setLoginEmailError('')
	}

	const loginPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginPassword(e.target.value)
		if (e.target.value !== user?.password) {
			setLoginPasswordError('Данные не совпадают. Проверьте ваш пароль')
		} else setLoginPasswordError('')
	}

	const onLoginHandler = () => navigate('/catalog')

	return (
		<div className={`${login.parent} df jcc aic`}>
			<div className={`${login.container} cw df fdc rcsf`}>
				<div className={login.section}>
					<h2 className={login.title}>Email</h2>
					<input
						value={loginEmail}
						className={`${login.input} w100`}
						onChange={loginEmailHandler}
						type='text'
					/>
					<span className={login.error}>{loginEmailError}</span>
				</div>
				<div className={login.section}>
					<h2 className={login.title}>Password</h2>
					<input
						value={loginPassword}
						onChange={loginPasswordHandler}
						className={`${login.input} w100`}
						type='password'
					/>
					<span className={login.error}>{loginPasswordError}</span>
				</div>
				<div className={`${login.router} df aic jcsb`}>
					<Button isDisabled={!valid} sendData={onLoginHandler} title='Login' />
					<span>
						Don't have an account?{' '}
						<Link className={login.link} to={'/registration'}>
							Register
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}
