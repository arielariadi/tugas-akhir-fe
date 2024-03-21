import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../styles/component-styles/before-login-navbar.css';
import { Button } from 'react-bootstrap';

const NavbarAfterLogin = () => {
	const [changeColor, setChangeColor] = useState(false);

	const changeBackgroundColor = () => {
		if (window.scrollY > 10) {
			setChangeColor(true);
		} else {
			setChangeColor(false);
		}
	};

	useEffect(() => {
		changeBackgroundColor();

		window.addEventListener('scroll', changeBackgroundColor);
	});

	const handleLogout = () => {
		localStorage.removeItem('userToken');
		window.location.href = '/login';
	};

	return (
		<Navbar
			expand="lg"
			className={changeColor ? 'color-active' : ''}
			fixed="top">
			<Container>
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav ">
					<Nav className="mx-auto text-center">
						<Nav.Link href="#home" className="p-3 ">
							Dashboard User
						</Nav.Link>
						<Nav.Link href="#link" className="p-3">
							Link
						</Nav.Link>
						<Nav.Link href="#link" className="p-3">
							Link
						</Nav.Link>
					</Nav>
					<Button variant="outline-danger" onClick={handleLogout}>
						Logout
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarAfterLogin;
