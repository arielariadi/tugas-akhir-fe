import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/component-styles/sidebar-admin.css';
import { IconContext } from 'react-icons';

import { FaGithub } from 'react-icons/fa';

function SidebarAdmin() {
	const [sidebar, setSidebar] = useState(false);
	const [icon, setIcon] = useState(false); // Menambahkan state untuk mengontrol ikon

	const showSidebar = () => {
		setSidebar(!sidebar);
		setIcon(!icon); // Mengubah ikon saat sidebar ditampilkan atau disembunyikan
	};

	return (
		<>
			<IconContext.Provider value={{ color: 'undefined' }}>
				<div className="navbar">
					<Link to="#" className="menu-bars">
						{icon ? (
							<IoIcons.IoIosCloseCircle onClick={showSidebar} />
						) : (
							<FaIcons.FaBars onClick={showSidebar} />
						)}
					</Link>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className="nav-menu-items" onClick={showSidebar}>
						<li className="navbar-toggle">
							<Link to="#" className="menu-bars">
								<FaGithub />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}

export default SidebarAdmin;
