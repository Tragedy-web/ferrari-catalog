import { Button, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Header, Content, Footer } = Layout

import ferrari from '../../../../public/Ferrari.svg'
import home from './home.module.scss'

export const HomePage = () => {
	const navigate = useNavigate()

	return (
		<Layout className={home.container}>
			<Header className={`${home.header} w100 df jcsb aic`}>
				<div className='w100 df aic'>
					<img src={ferrari} alt='' className={home.logo} />
				</div>
				<div className='df gr'>
					<Button className={home.login} onClick={() => navigate('/login')}>
						Sign In
					</Button>
					<Button
						className={home.registration}
						onClick={() => navigate('/registration')}
						type='primary'
					>
						Register
					</Button>
				</div>
			</Header>
			<Content className={`${home.content} df jcc aic`}>
				Пожалуйста, войдите в аккаунт
			</Content>
			<Footer className={home.footer}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</Layout>
	)
}
