import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Field } from '../../components/field/Field'
import { Button } from '../../components/ui/button/Button'
import { useDebounce } from '../../hooks/useDebounce'
import { getUser } from '../../services/getUser.service'
import { TypeAuth } from '../../types/auth.types'
import login from './styles/login.module.scss'

export function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [valid, setValid] = useState(false)
	const [user, setUser] = useState<TypeAuth>()
	const debounce = useDebounce(email, 600)

	useEffect(() => {
		if (!email || !password) {
			setValid(false)
		} else if (emailError || passwordError) {
			setValid(false)
		} else setValid(true)
	}, [email, password, emailError, passwordError])

	useEffect(() => {
		if (debounce) getUser(debounce, setUser, setValid)
	}, [debounce])

	useEffect(() => {
		if (user) {
			if (email !== user.email) {
				setEmailError('Email invalid. Please try again!')
			} else if (password !== user.password) {
				setPasswordError('Password invalid. Please try again!')
			} else {
				setEmailError('')
				setPasswordError('')
			}
		}
	}, [user, email, password])

	const onLoginHandler = () => {
		if (user) {
			localStorage.setItem('key', String(user.id))
			navigate('/catalog')
		}
	}

	return (
		<main className={`${login.parent} df jcc aic`}>
			<form
				onSubmit={e => e.preventDefault()}
				className={`${login.container} cw df fdc rcsf`}
			>
				<Field
					title='Email'
					type='text'
					value={email}
					changeData={e => setEmail(e.target.value)}
					error={emailError}
				/>
				<Field
					title='Password'
					type='password'
					value={password}
					changeData={e => setPassword(e.target.value)}
					error={passwordError}
				/>
				<div className={`${login.router} df aic jcsb`}>
					<Button isDisabled={!valid} sendData={onLoginHandler} title='Login' />
					<div>
						<span>Don't have an account?</span>{' '}
						<Link to={'/registration'} className={login.link}>
							Register
						</Link>
					</div>
				</div>
			</form>
		</main>
	)
}
