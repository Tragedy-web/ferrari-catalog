import { ReactNode } from 'react'
import { Header, Footer } from 'antd/es/layout/layout'
import { Button } from 'antd'
import Input from 'antd/es/input/Input'

import layout from './styles/layout.module.scss'

type TypeLayout = {
	children: ReactNode
}

export function Layout({ children }: TypeLayout) {
	return (
		<div className={`${layout.container} cw`}>
			<Header className={`${layout.header} df jcsb aic`}>
				<Button type='primary'>Admin</Button>
				<Input className={layout.search} placeholder='Search' />
			</Header>
			<div className={`${layout.content} df jcc aic`}>{children}</div>
			<Footer className={`${layout.footer} cw`}>
				Ferrari Catalog | &copy; tragedyfiftyone
			</Footer>
		</div>
	)
}
