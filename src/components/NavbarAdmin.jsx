/* eslint-disable react/prop-types */
const NavbarAdmin = ({ Toggle }) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
			<i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
			<button
				className="navbar-toggler d-lg-none"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<i className="bi bi-justify"></i>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav ms-auto mt-2 mt-lg-0">
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							Ariel
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="#">
								Profile
							</a>
							<a className="dropdown-item" href="#">
								Setting
							</a>
							<a className="dropdown-item" href="#">
								Logout
							</a>
							<div className="dropdown-divider"></div>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavbarAdmin;
