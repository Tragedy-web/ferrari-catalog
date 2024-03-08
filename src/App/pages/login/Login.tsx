import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Field } from '../../components/field/Field'
import { Button } from '../../components/ui/button/Button'
import { useTypedSelector } from '../../store/hooks/useTypedSelector'
import login from './styles/login.module.scss'

export function Login() {
	const { user } = useTypedSelector(state => state.auth)
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [valid, setValid] = useState(false)

	useEffect(() => {
		if (!email || !password) {
			setValid(false)
		}
		else if (emailError || passwordError) {
			setValid(false)
		} else setValid(true)
	}, [email, password])

	const emailHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value)
			if (e.target.value !== user?.email) {
				setEmailError('Данные не совпадают. Проверьте ваш email')
			} else setEmailError('')
		},
		[email, setEmailError]
	)

	const passwordHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value)
			if (e.target.value !== user?.password) {
				setPasswordError('Данные не совпадают. Проверьте ваш пароль')
			} else setPasswordError('')
		},
		[password, setPasswordError]
	)

	const onLoginHandler = () => navigate('/catalog')


	return (
		<main className={`${login.parent} df jcc aic`}>
			<div className={`${login.container} cw df fdc rcsf`}>
				<Field
					title='Email'
					type='text'
					value={email}
					changeData={emailHandler}
					error={emailError}
				/>
				<Field
					title='Password'
					type='password'
					value={password}
					changeData={passwordHandler}
					error={passwordError}
				/>
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
		</main>
	)
}
