import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/404/NotFound.tsx'
import { AdminPanel } from './pages/adminPanel/AdminPanel.tsx'
import { Catalog } from './pages/catalog/Catalog.tsx'
import { Home } from './pages/home/Home.tsx'
import { Login } from './pages/login/Login.tsx'
import { Profile } from './pages/profile/Profile.tsx'
import { Registration } from './pages/register/Registration.tsx'

export const Landing = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<NotFound />} />
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/catalog' element={<Catalog />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/admin' element={<AdminPanel />} />
			</Routes>
		</BrowserRouter>
	)
}
