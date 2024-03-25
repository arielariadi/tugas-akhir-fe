// Navbar.js
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from '../assets/img/logo.png';

import '../styles/component-styles/navbar-component.css';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function NavbarComponent() {
	// Simpan token pengguna (userToken atau adminToken) di sini
	const userToken = localStorage.getItem('userToken');
	// const adminToken = localStorage.getItem('adminToken');

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
		// localStorage.removeItem('adminToken');
		window.location.href = '/login';
	};

	// Menambahkan kondisional rendering untuk menyembunyikan navbar di halaman login dan register
	if (
		window.location.pathname === '/login' ||
		window.location.pathname === '/register'
	) {
		return null; // Return null untuk menyembunyikan navbar di halaman login dan register
	}

	return (
		<Navbar
			expand="lg"
			className={changeColor ? 'color-active' : ''}
			fixed="top">
			<Container>
				<Navbar.Brand href="#home">
					<img src={Logo} className="logo" alt="Logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav ">
					<Nav className="mx-auto text-center ">
						{!userToken && <Nav.Link href="#home">Home</Nav.Link>}

						{!userToken && <Nav.Link href="#homeee">Services</Nav.Link>}

						{!userToken && <Nav.Link href="#home">Services</Nav.Link>}

						{!userToken && <Nav.Link href="#home">Services</Nav.Link>}

						{userToken && <Nav.Link href="/dashboard-user">Dashboard</Nav.Link>}

						{userToken && (
							<Nav.Link href="/jadwal-donor-darah">Jadwal Donor Darah</Nav.Link>
						)}

						{userToken && (
							<Nav.Link href="/cari-sukarelawan">Cari Sukarelawan</Nav.Link>
						)}

						{userToken && <Nav.Link href="/profile-user">Profile</Nav.Link>}
					</Nav>

					{userToken && (
						<Button variant="danger" onClick={handleLogout}>
							Logout
						</Button>
					)}

					{!userToken && (
						<Button
							className="button-register"
							variant="danger"
							href="/register">
							Register
						</Button>
					)}

					{!userToken && (
						<Button className="button-login" href="/login">
							Login
						</Button>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarComponent;