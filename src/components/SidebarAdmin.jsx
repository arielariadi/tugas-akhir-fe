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
			<div className="col-4 col-md-2 bg-white vh-100 position-fixed">
				<div className="bg-white sidebar p-2">
					<div className="m-2">
						<i className="bi bi-bootstrap-fill me-3 fs-4"></i>
						<span className="brand-name fs-4">Ariel</span>
					</div>
					<hr className="text-dark" />
					<div className="list-group list-group-flush">
						<a className="list-group-item py-2" href="/dashboard-admin">
							<i className="bi bi-speedometer2 fs-5 me-3"></i>
							<span>Dashboard</span>
						</a>

						<a className="list-group-item py-2" href="/bank-darah">
							<i className="bi bi-house fs-5 me-3"></i>
							<span>Stok Bank Darah</span>
						</a>

						<a className="list-group-item py-2" href="/pendonor-darah">
							<i className="bi bi-table fs-5 me-3"></i>
							<span>Pendonor Darah</span>
						</a>

						<a className="list-group-item py-2" href="">
							<i className="bi bi-clipboard-data fs-5 me-3"></i>
							<span>Profile</span>
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
