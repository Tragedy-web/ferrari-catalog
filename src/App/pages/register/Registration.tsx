import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTypedDispatch } from '../../store/hooks/typedHooks.ts'
import { sucessAuth } from '../../store/slices/authSlice.ts'
import { TypeAuth } from '../../types/authSlice.types.ts'
import { regex } from './regex/Regex.ts'
import reg from './registration.module.scss'

export const Registration = () => {
	const dispatch = useTypedDispatch()
	const navigate = useNavigate()

	const [userEmail, setUserEmail] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [userPasswordError, setUserPasswordError] = useState('')
	const [secondPassword, setSecondPassword] = useState('')
	const [secondPasswordError, setSecondPasswordError] = useState('')
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (!userEmail || !userPassword || !secondPassword) {
			setFormValid(false)
		} else if (emailError || userPasswordError || secondPasswordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [userEmail, userPassword, secondPassword])

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

		if (userPassword.length < 3) {
			setUserPasswordError('Длина пароля меньше 3 символов')
		} else setUserPasswordError('')
	}

	const secondPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSecondPassword(e.target.value)

		if (e.target.value.length !== 0) {
			comparePasswords(userPassword, e.target.value)
		}
	}

	const comparePasswords = useCallback(
		(first: string, second: string) => {
			if (first !== second) {
				setSecondPasswordError('Пароли не совпадают')
			} else setSecondPasswordError('')
		},
		[userEmail, userPassword, setSecondPasswordError]
	)

	const sendData = () => {
		const data: TypeAuth = {
			email: userEmail,
			password: userPassword,
			confirmPassword: secondPassword,
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
						value={secondPassword}
						onChange={secondPasswordHandler}
					/>
					<span className={reg.error}>{secondPasswordError}</span>
				</div>
				<button disabled={!formValid} onClick={sendData} className={reg.btn}>
					Register
				</button>
			</div>
		</div>
	)
}
