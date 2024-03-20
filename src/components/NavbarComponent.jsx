import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/component-styles/navbar.css';

const NavbarComponent = () => {
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

	return (
		<Navbar expand="lg" className={changeColor ? 'color-active' : ''}>
			<Container>
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav ">
					<Nav className="mx-auto text-center">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
					</Nav>
					<Button className="btn btn-danger">Registrasi</Button>
					<Button className="ms-3" variant="warning">
						Login
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
