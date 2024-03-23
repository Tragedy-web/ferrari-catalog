import {
	FileAddOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Button, Input, Spin } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { FormEvent, PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'
import layout from './styles/layout.module.scss'

type TypeLayout = {
	setPanelOpen: (open: boolean) => void
	setQueryTerm: (searchParam: string) => void
	openCart: (active: boolean) => void
}

export function Layout({
	children,
	setPanelOpen,
	setQueryTerm,
	openCart,
}: PropsWithChildren<TypeLayout>) {
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const { isAdmin, avatar } = useTypedSelector(state => state.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (children) setLoading(false)
	}, [children])

	const postData = (e: FormEvent) => {
		e.preventDefault()
		setQueryTerm(search)
	}

	return (
		<div className={`${layout.container} cw`}>
			<Header className={`${layout.header} df jcsb aic`}>
				<div>
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
				</div>
				<div className='df aic gr10'>
					<form onSubmit={postData} className='df aic gr10'>
						<Input
							value={search}
							onChange={e => setSearch(e.target.value)}
							type='search'
							placeholder='Search...'
							className={layout.field}
						/>
					</form>
					<div className='df aic'>
						<Button onClick={() => openCart(true)} className={layout.button}>
							<ShoppingCartOutlined />
						</Button>
					</div>
				</div>
			</Header>
			{isAdmin && (
				<nav className={layout.navbar}>
					<Button type='link' className='cw' onClick={() => setPanelOpen(true)}>
						<FileAddOutlined /> Create
					</Button>
				</nav>
			)}
			<Content
				className={loading ? `${layout.loader} df jcc aic` : layout.content}
			>
				{loading ? <Spin size='large' /> : children}
			</Content>
			<Footer className={`${layout.footer} cw`}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</div>
	)
}
