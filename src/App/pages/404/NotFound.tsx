import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import error from './styles/notFound.module.scss'

export function NotFound() {
	const navigate = useNavigate()
	return (
		<div className={`${error.container} df fdc jcc aic cw`}>
			<section>
				<h1>This page is not found.</h1>
				<p>Maybe you write wrong path. We can redirect you to a last page who's you visited</p>
			</section>
			<Button
				type='dashed'
				onClick={() => navigate(-1)}
				className={error.button}
			>
				Go back
			</Button>
		</div>
	)
}
