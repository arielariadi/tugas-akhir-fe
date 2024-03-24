import { useState } from 'react';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import SidebarAdmin from '../components/SidebarAdmin';

const SidebarContainer = () => {
	const [toggle, setToggle] = useState(true);
	const Toggle = () => {
		setToggle(!toggle);
	};
	return (
		<div className="container-fluid bg-secondary min-vh-100">
			<div className="row">
				{toggle && (
					<div className="col-4 col-md-2 bg-white vh-100 position-fixed">
						<SidebarAdmin />
					</div>
				)}

				{toggle && <div className="col-4 col-md-2"></div>}

				<div className="col p-0">
					<DashboardAdmin Toggle={Toggle} />
				</div>
			</div>
		</div>
	);
};

export default SidebarContainer;
