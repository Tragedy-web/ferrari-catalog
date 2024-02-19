import { Button } from 'antd'
import Input from 'antd/es/input/Input'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { ReactNode } from 'react'

import layout from './styles/layout.module.scss'

type TypeLayout = {
	children: ReactNode
}

export function Layout({ children }: TypeLayout) {
	return (
		<div className={`${layout.container} cw`}>
			<Header className={`${layout.header} df jcsb aic`}>
				<Button type='primary'>Admin</Button>
				<Input type='search' className={layout.search} placeholder='Search' />
			</Header>
			<Content className={layout.content}>{children}</Content>
			<Footer className={`${layout.footer} cw`}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</div>
	)
}
