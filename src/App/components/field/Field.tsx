import { ChangeEvent } from 'react'

import field from './styles/field.module.scss'

type TypeField = {
	title: string
	placeholder?: string
	type: string
	value: string
	error: string
	changeData: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Field({
	title,
	placeholder = 'Enter text...',
	type,
	value,
	error,
	changeData,
}: TypeField) {
	return (
		<section className={field.section}>
			<h1 className={`${field.title} cw`}>{title}</h1>
			<input
				type={type}
				value={value}
				onChange={changeData}
				placeholder={placeholder}
				className={`${field.input} w100`}
			/>
			<span className={field.error}>{error}</span>
		</section>
	)
}
