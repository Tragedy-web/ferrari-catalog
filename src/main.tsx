import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import { Landing } from './App/Landing.tsx'
import { store } from './App/store/store.ts'
import './App/assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						contentBg: '#060606',
                  headerBg: '#060606',
						colorIcon: '#fff',
						colorIconHover: 'rgb(240, 240, 240)',
						titleColor: '#fff'
					}
				},
			}}
		>
			<Landing />
		</ConfigProvider>
	</Provider>
)
