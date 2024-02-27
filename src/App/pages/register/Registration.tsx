import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/ui/button/Button.tsx'
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch.ts'
import { sucessAuth } from '../../store/slices/authSlice.ts'
import { TypeAuth } from '../../store/types/authSlice.types.ts'
import { regex } from './regex/Regex.ts'
import reg from './styles/registration.module.scss'
import { Field } from '../../components/field/Field.tsx'

export function Registration() {
	const dispatch = useTypedDispatch()
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
			if (!regex.test(e.target.value)) {
				setEmailError('Ваши данные неккоректны')
			} else setEmailError('')
		},
		[userEmail, setEmailError]
	)

	const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setFirstPassword(e.target.value)
		if (e.target.value.length <= 3) {
			setFirstPasswordError('Длина пароля меньше 3 символов')
		} else setFirstPasswordError('')
		if (e.target.value && secondPassword) {
			comparePasswords(e.target.value, secondPassword)
		}
	}

	const secondPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSecondPassword(e.target.value)
		if (e.target.value && firstPassword) {
			comparePasswords(e.target.value, firstPassword)
		}
	}

	const comparePasswords = useCallback(
		(first: string, second: string) => {
			if (first !== second) {
				setSecondPasswordError('Пароли не совпадают')
			} else setSecondPasswordError('')
		},
		[userEmail, firstPassword, setSecondPasswordError]
	)

	const sendData = () => {
		const data: TypeAuth = {
			email: userEmail,
			password: firstPassword,
			confirmPassword: secondPassword,
		}
		dispatch(sucessAuth(data))
		navigate('/login')
	}
	return (
		<div className={`${reg.parent} df jcc aic`}>
			<div className={`${reg.container} cw df fdc rcsf`}>
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
				<Button title='Register' sendData={sendData} isDisabled={!formValid} />
			</div>
		</div>
	)
}
