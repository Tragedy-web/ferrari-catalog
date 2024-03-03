import { Link } from 'react-router-dom'

import item from './styles/navigate.module.scss'

type TypeNavigate = {
	navigate: string,
	title: string
}

export function Navigate({navigate, title}: TypeNavigate) {
	return <Link className={item.link} to={navigate}>{title}</Link>
}
