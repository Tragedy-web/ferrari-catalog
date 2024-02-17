import btn from './styles/button.module.scss'

type TypeButton = {
	title: string
	isDisabled: boolean
	sendData: () => void
}

export function Button({ title, isDisabled, sendData }: TypeButton) {
	return (
		<button disabled={isDisabled} onClick={sendData} className={btn.button}>
			{title}
		</button>
	)
}
