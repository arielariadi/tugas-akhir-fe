import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import FormLogin from './pages/FormLogin';
import FormRegister from './pages/FormRegister';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<LandingPage />}></Route>
				<Route path="/login" element={<FormLogin />}></Route>
				<Route path="/register" element={<FormRegister />}></Route>
				<Route path="/dashboard-user" element={<DashboardUser />}></Route>
				<Route path="/dashboard-admin" element={<DashboardAdmin />}></Route>
			</Routes>
		</div>
	);
}

export default App;
