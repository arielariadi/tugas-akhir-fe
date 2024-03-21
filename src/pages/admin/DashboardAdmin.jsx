const DashboardAdmin = () => {
	const handleLogout = () => {
		localStorage.removeItem('adminToken');
		window.location.href = '/login';
	};

	return (
		<>
			<h1>Dashboard Admin</h1>
			<button onClick={handleLogout}>Logoutn</button>
		</>
	);
};

export default DashboardAdmin;
