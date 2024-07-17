import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import FormLogin from './pages/FormLogin';
import FormRegister from './pages/FormRegister';
import NavbarComponent from './components/NavbarComponent';
import JadwalDonorDarah from './pages/JadwalDonorDarah';
import PermintaanDarah from './pages/PermintaanDarah';

import SidebarAdmin from './components/SidebarAdmin';
import BankDarah from './pages/admin/BankDarah';
import DaftarPermintaanDarah from './pages/admin/DaftarPermintaanDarah';

import CariSukarelawan from './pages/CariSukarelawan';
import ProfileUser from './pages/ProfileUser';
import PendonorDarah from './pages/admin/PendonorDarah';
import ValidasiPendonorDarah from './pages/admin/ValidasiPendonorDarah';

import FooterComponent from './components/FooterComponent';

// import 'bootstrap';

function getUserToken() {
	// Gantikan dengan implementasi sesuai kebutuhan
	return localStorage.getItem('userToken');
}

function getAdminToken() {
	// Gantikan dengan implementasi sesuai kebutuhan
	return localStorage.getItem('adminToken');
}

function App() {
	const userToken = getUserToken(); // Gantikan dengan implementasi sesuai kebutuhan
	const adminToken = getAdminToken(); // Gantikan dengan implementasi sesuai kebutuhan

	return (
		<div>
			{adminToken ? <SidebarAdmin /> : <NavbarComponent />}

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<FormLogin />} />
				<Route path="/register" element={<FormRegister />} />
				{userToken && (
					<>
						<Route path="/dashboard-user" element={<DashboardUser />} />
						<Route path="/jadwal-donor-darah" element={<JadwalDonorDarah />} />
						<Route path="/permintaan-darah" element={<PermintaanDarah />} />
						<Route path="/cari-sukarelawan" element={<CariSukarelawan />} />
						<Route path="/profile-user" element={<ProfileUser />} />
					</>
				)}
				{adminToken && (
					<>
						<Route path="/dashboard-admin" element={<DashboardAdmin />} />
						<Route path="/bank-darah" element={<BankDarah />} />
						<Route path="/calon-pendonor" element={<PendonorDarah />} />
						<Route
							path="/validasi-pendonor-darah"
							element={<ValidasiPendonorDarah />}
						/>
						<Route
							path="/permintaan-darah"
							element={<DaftarPermintaanDarah />}
						/>
					</>
				)}
			</Routes>

			{!adminToken && <FooterComponent />}
		</div>
	);
}

export default App;
