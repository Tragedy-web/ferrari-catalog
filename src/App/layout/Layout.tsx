import { Button } from 'antd'
import {
	SearchOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { PropsWithChildren } from 'react'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import layout from './styles/layout.module.scss'
import { useTypedSelector } from '../store/hooks/useTypedSelector'

type TypeLayout = {
	search: string
	setQueryTerm: (searchParam: string) => void
	setSearch: (param: string) => void
	openCart: (active: boolean) => void
}

export function Layout({
	children,
	search,
	setQueryTerm,
	setSearch,
	openCart,
}: PropsWithChildren<TypeLayout>) {
	const { avatar } = useTypedSelector(state => state.user)
	const navigate = useNavigate()

	const postData = () => setQueryTerm(search)
	return (
		<div className={`${layout.container} cw`}>
			<Header className={`${layout.header} df jcsb aic`}>
				<div className='df aic gr10'>
					<Button
						className='df aic cw'
						type='link'
						onClick={() => navigate('/profile')}
					>
						{avatar ? (
							<img src={avatar} className={layout.avatar} />
						) : (
							<UserOutlined />
						)}
					</Button>
					<Button
						className={layout.admin}
						onClick={() => navigate('/admin')}
						type='primary'
					>
						Admin
					</Button>
				</div>
				<div className='df aic gr10'>
					<div className='df aic gr10'>
						<Input
							value={search}
							onChange={e => setSearch(e.target.value)}
							type='search'
							placeholder='Request...'
							className={layout.field}
						/>
						<Button onClick={postData} className={layout.button}>
							<SearchOutlined />
						</Button>
					</div>
					<div className='df aic'>
						<Button onClick={() => openCart(true)} className={layout.button}>
							<ShoppingCartOutlined />
						</Button>
					</div>
				</div>
			</Header>
			<Content className={layout.content}>
				{children}
			</Content>
			<Footer className={`${layout.footer} cw`}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</div>
	)
}
