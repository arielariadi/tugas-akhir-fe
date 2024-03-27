import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../services/auth.service';

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
			{' '}
			<a href="/">Back</a>
			<Form onSubmit={handleLogin}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={e => setEmail(e.target.value)}
						name="email"
						value={email}
					/>
					<Form.Text className="text-muted">
						never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={e => setPassword(e.target.value)}
						name="password"
						value={password}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
				{loginFailed && (
					<p className="text-danger text-center">{loginFailed}</p>
				)}
			</Form>
		</>
	);
};

export default FormLogin;
