import ReactDOM from 'react-dom/client'
import { Landing } from './App/Landing.tsx'
import './App/assets/styles/global.scss'
import { Provider } from 'react-redux'
import { store } from './App/store/store.ts'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						contentBg: '#060606',
                  headerBg: '#060606',
						colorIcon: '#fff',
						colorIconHover: 'rgb(240, 240, 240)'
					},
				},
			}}
		>
			<Landing />
		</ConfigProvider>
	</Provider>
)
