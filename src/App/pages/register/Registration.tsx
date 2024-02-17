import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/ui/button/Button.tsx'
import { useTypedDispatch } from '../../store/hooks/typedHooks.ts'
import { sucessAuth } from '../../store/slices/authSlice.ts'
import { TypeAuth } from '../../store/types/authSlice.types.ts'
import { regex } from './regex/Regex.ts'
import reg from './styles/registration.module.scss'

export function Registration() {
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()
	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [userPasswordError, setUserPasswordError] = useState('')
	const [secondUserPassword, setSecondUserPassword] = useState('')
	const [secondUserPasswordError, setSecondUserPasswordError] = useState('')
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (!userEmail || !userPassword || !secondUserPassword) {
			setFormValid(false)
		} else if (emailError || userPasswordError || secondUserPasswordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [userEmail, userPassword, secondUserPassword])

	const emailHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setUserEmail(e.target.value)
			if (!regex.test(e.target.value)) {
				setEmailError('Ваши данные неккоректны')
			} else setEmailError('')
		},
		[userEmail, setEmailError]
	)

	const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setUserPassword(e.target.value)
		if (e.target.value.length <= 3) {
			setUserPasswordError('Длина пароля меньше 3 символов')
		} else setUserPasswordError('')
		if (e.target.value && secondUserPassword) {
			comparePasswords(e.target.value, secondUserPassword)
		}
	}

	const secondPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSecondUserPassword(e.target.value)
		if (e.target.value && userPassword) {
			comparePasswords(e.target.value, userPassword)
		}
	}

	const comparePasswords = useCallback(
		(first: string, second: string) => {
			if (first !== second) {
				setSecondUserPasswordError('Пароли не совпадают')
			} else setSecondUserPasswordError('')
		},
		[userEmail, userPassword, setSecondUserPasswordError]
	)

	const sendData = () => {
		const data: TypeAuth = {
			email: userEmail,
			password: userPassword,
			confirmPassword: secondUserPassword,
		}
		dispatch(sucessAuth(data))
		navigate('/login')
	}
	return (
		<div className={`${reg.parent} df jcc aic`}>
			<div className={`${reg.container} cw df fdc rcsf`}>
				<div className={reg.section}>
					<h2 className={reg.title}>Email</h2>
					<input
						className={`${reg.input} w100`}
						type='text'
						value={userEmail}
						onChange={emailHandler}
					/>
					<span className={reg.error}>{emailError}</span>
				</div>
				<div className={reg.section}>
					<h2 className={reg.title}>Password</h2>
					<input
						className={`${reg.input} w100`}
						type='password'
						value={userPassword}
						onChange={passwordHandler}
					/>
					<span className={reg.error}>{userPasswordError}</span>
				</div>
				<div className={reg.section}>
					<h2 className={reg.title}>Confirm Password</h2>
					<input
						className={`${reg.input} w100`}
						type='password'
						value={secondUserPassword}
						onChange={secondPasswordHandler}
					/>
					<span className={reg.error}>{secondUserPasswordError}</span>
				</div>
				<Button title='Register' sendData={sendData} isDisabled={!formValid} />
			</div>
		</div>
	)
}
