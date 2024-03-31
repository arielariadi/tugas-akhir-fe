import '../styles/component-styles/footer-component.css';

const FoterComponent = () => {
	const userToken = localStorage.getItem('userToken');
	const adminToken = localStorage.getItem('adminToken');

	if (
		window.location.pathname === '/login' ||
		window.location.pathname === '/register'
	) {
		return null;
	}

	return (
		<div className="footer-wrapper">
			<footer>
				<div className="container">
					<div className="row">
						<div className="col-sm-6 col-md-3 item">
							<h3>Services</h3>
							<ul>
								<li>
									<a href="#">Web design</a>
								</li>
								<li>
									<a href="#">Development</a>
								</li>
								<li>
									<a href="#">Hosting</a>
								</li>
							</ul>
						</div>
						<div className="col-sm-6 col-md-3 item">
							<h3>About</h3>
							<ul>
								<li>
									<a href="#">Company</a>
								</li>
								<li>
									<a href="#">Team</a>
								</li>
								<li>
									<a href="#">Careers</a>
								</li>
							</ul>
						</div>
						<div className="col-md-6 item text">
							<h3>UDD PMI Kabupaten Lebak</h3>
							<p>
								Praesent sed lobortis mi. Suspendisse vel placerat ligula.
								Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis
								tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel
								in justo.
							</p>
						</div>
						<div className="col item social">
							<a href="#">
								<i className="bi bi-facebook"></i>
							</a>
							<a href="#">
								<i className="bi bi-twitter"></i>
							</a>

							<a href="#">
								<i className="bi bi-instagram"></i>
							</a>
						</div>
					</div>
					<p className="mt-3 text-center">
						Unit Donor Darah PMI Kabupaten Lebak &copy; 2024
					</p>
				</div>
			</footer>
		</div>
	);
};
export default FoterComponent;
