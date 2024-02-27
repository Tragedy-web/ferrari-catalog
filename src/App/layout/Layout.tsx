import { Button } from 'antd'
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { PropsWithChildren, ChangeEvent } from 'react'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import layout from './styles/layout.module.scss'

type TypeLayout = {
	search: string
	setSearch: (value: string) => void
	postDataHandler: (query: string) => void
	openCart: (active: boolean) => void
}

export function Layout({
	children,
	search,
	setSearch,
	postDataHandler,
	openCart,
}: PropsWithChildren<TypeLayout>) {
	const navigate = useNavigate()

	const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}
	
	const postData = () => postDataHandler(search)

	return (
		<div className={`${layout.container} cw`}>
			<Header className={`${layout.header} df jcsb aic`}>
				<div>
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
							onChange={onSearchHandler}
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
			<Content className={layout.content}>{children}</Content>
			<Footer className={`${layout.footer} cw`}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</div>
	)
}
