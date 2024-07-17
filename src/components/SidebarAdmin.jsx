import { useNavigate } from 'react-router-dom';

const SidebarAdmin = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('adminToken');
		// window.location.href = '/login';
		navigate('/login');
	};

	return (
		<div className="row">
			<div
				className="col-4 col-md-2 bg-white vh-100 position-fixed"
				style={{ width: '250px', zIndex: '999' }}>
				<div className="bg-white sidebar p-2">
					<div className="m-2">
						<i className="bi bi-person-check-fill ms-2 fs-4"></i>
						<span className="brand- ms-2 fs-4 fw-bold">Admin</span>
					</div>
					<hr className="text-dark" />
					<div className="list-group list-group-flush">
						<a className="list-group-item py-2" href="/dashboard-admin">
							<i className="bi bi-speedometer2 fs-5 me-3"></i>
							<span>Dashboard</span>
						</a>

						<a className="list-group-item py-2" href="/bank-darah">
							<i className="bi bi-house fs-5 me-3"></i>
							<span>Bank Darah</span>
						</a>

						<a className="list-group-item py-2" href="/calon-pendonor">
							<i className="bi bi-table fs-5 me-3"></i>
							<span>Calon Pendonor</span>
						</a>

						<a className="list-group-item py-2" href="/validasi-pendonor-darah">
							<i className="bi bi-eject fs-5 me-3"></i>
							<span>Validasi Pendonor</span>
						</a>

						<a className="list-group-item py-2" href="/permintaan-darah">
							<i className="bi bi-envelope fs-5 me-3"></i>
							<span>Permintaan Darah</span>
						</a>

						<a className="list-group-item py-2" href="" onClick={handleLogout}>
							<i className="bi bi-power fs-5 me-3"></i>
							<span>Logout</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarAdmin;
