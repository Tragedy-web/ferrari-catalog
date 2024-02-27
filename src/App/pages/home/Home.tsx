import { Button, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Header, Footer } = Layout
import Title from 'antd/es/typography/Title'

import ferrari from '../../../../public/Ferrari.svg'
import home from './styles/home.module.scss'
import { Content } from 'antd/es/layout/layout'

export const Home = () => {
	const navigate = useNavigate()

	return (
		<Layout className={home.container}>
			<Header className={`${home.header} df jcsb aic`}>
				<div className='df aic'>
					<img src={ferrari} alt='' className={home.logo} />
				</div>
				<div className='df gr10'>
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
				<Title className={`${home.title} tac`}>Пожалуйста, войдите в аккаунт</Title>
			</Content>
			<Footer className={`${home.footer} tac`}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</Layout>
	)
}
