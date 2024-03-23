import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Field } from '../../components/field/Field.tsx'
import { Button } from '../../components/ui/button/Button.tsx'
import { Navigate } from '../../components/ui/navigate/Navigate.tsx'
import { EmailChecker } from '../../constants/regex/regex.ts'
import { createUser } from '../../services/createUser.service.ts'
import { TypeAuth } from '../../types/auth.types.ts'
import reg from './styles/registration.module.scss'

export const Registration = () => {
	const navigate = useNavigate()
	const [userEmail, setUserEmail] = useState('')
	const [firstPassword, setFirstPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [firstPasswordError, setFirstPasswordError] = useState('')
	const [secondPassword, setSecondPassword] = useState('')
	const [secondPasswordError, setSecondPasswordError] = useState('')
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (!userEmail || !firstPassword || !secondPassword) {
			setFormValid(false)
		} else if (emailError || firstPasswordError || secondPasswordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [userEmail, firstPassword, secondPassword])

	const emailHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setUserEmail(e.target.value)
			if (!EmailChecker.test(e.target.value)) {
				setEmailError('Email invalid. Please enter a valid email address.')
			} else setEmailError('')
		},
		[userEmail, setEmailError]
	)

	const passwordHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setFirstPassword(e.target.value)
			if (e.target.value) {
				comparePasswords(e.target.value, secondPassword)
			}
			if (e.target.value.length < 3) {
				setFirstPasswordError('Password length must be more than 3 symbols')
			} else setFirstPasswordError('')
		},
		[firstPassword, setFirstPasswordError]
	)

	const secondPasswordHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setSecondPassword(e.target.value)
			if (e.target.value) {
				comparePasswords(firstPassword, e.target.value)
			}
		},
		[secondPassword]
	)

	const comparePasswords = (first: string, second: string) => {
		if (first !== second) {
			setSecondPasswordError(`Passwords mismatch. Try again!`)
		} else setSecondPasswordError('')
	}

	const registrationHandler = () => {
		const data: Omit<TypeAuth, 'id'> = {
			email: userEmail,
			password: firstPassword,
			isAdmin: false,
			avatar: '',
		}
		createUser(data, navigate, setFormValid)
	}

	return (
		<main className={`${reg.parent} df jcc aic`}>
			<form
				onSubmit={e => e.preventDefault()}
				className={`${reg.container} cw df fdc rcsf`}
			>
				<Field
					title='Email'
					type='text'
					value={userEmail}
					changeData={emailHandler}
					error={emailError}
				/>
				<Field
					title='Password'
					type='password'
					value={firstPassword}
					changeData={passwordHandler}
					error={firstPasswordError}
				/>
				<Field
					title='Confirm Password'
					type='password'
					value={secondPassword}
					changeData={secondPasswordHandler}
					error={secondPasswordError}
				/>
				<div className={`${reg.navigation} df jcsb aic`}>
					<Button
						title='Register'
						sendData={registrationHandler}
						isDisabled={!formValid}
					/>
					<div>
						<span>Already have an account?</span>{' '}
						<Navigate title='Log in' navigate='/login' />
					</div>
				</div>
			</form>
		</main>
	)
}
