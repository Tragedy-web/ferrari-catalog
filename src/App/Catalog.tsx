import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage.tsx'
import { Login } from './pages/login/Login.tsx'
import { Registration } from './pages/register/Registration.tsx'
import { FerrariCatalog } from './pages/ferrariCatalog/FerrariCatalog.tsx'

export const Catalog = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/catalog' element={<FerrariCatalog />} />
			</Routes>
		</BrowserRouter>
	)
}
