import { useState } from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import { login } from '../services/auth.service';
import { Link } from 'react-router-dom';

import '../styles/component-styles/form-login.css';

const FormLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loginFailed, setLoginFailed] = useState('');

	const handleLogin = async event => {
		event.preventDefault();

		const data = {
			email: event.target.email.value,
			password: event.target.password.value,
		};

		try {
			const response = await login(data);
			if (response.tokenUser) {
				localStorage.setItem('userToken', response.tokenUser);
				window.location.href = '/dashboard-user';
			} else if (response.tokenAdmin) {
				localStorage.setItem('adminToken', response.tokenAdmin);
				window.location.href = '/dashboard-admin';
			} else {
				setLoginFailed('Invalid credentials');
			}
		} catch (error) {
			setLoginFailed(error.message);
		}
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col className="image-wrapper w-100 min-vh-100 p-0">
						<div className="button-back-wrapper">
							<a href="/">
								<i className="bi bi-arrow-left-circle-fill"></i>
							</a>
						</div>
						<img src="src/assets/img/login-image.png" alt="" />
					</Col>

					<Col className="form-wrapper d-flex flex-column justify-content-center align-items-center">
						<div className="button-back-responsive-wrapper">
							<a href="/">
								<i className="bi bi-arrow-left-circle-fill"></i>
							</a>
						</div>
						<Form onSubmit={handleLogin}>
							<div className="text-login-wrapper">
								<h1>Halo,</h1>
								<h1>Selamat Datang</h1>
							</div>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="example@gmail.com"
									onChange={e => setEmail(e.target.value)}
									name="email"
									value={email}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="************"
									onChange={e => setPassword(e.target.value)}
									name="password"
									value={password}
								/>
							</Form.Group>

							<Button type="submit">Submit</Button>
							{loginFailed && (
								<p className="text-danger text-center">{loginFailed}</p>
							)}
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default FormLogin;
