import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../services/register.service';
import { useState } from 'react';

const FormRegister = () => {
	const [registerFailed, setRegisterFailed] = useState('');

	const handleRegister = async event => {
		event.preventDefault();

		const data = {
			// nama object-nya samakan dengan response api-nya
			nama: event.target.namaLengkap.value,
			email: event.target.email.value,
			password: event.target.password.value,
			alamat: event.target.desa.value,
			jenis_kelamin: event.target.jenisKelamin.value,
			tanggal_lahir: event.target.tanggalLahir.value,
			id_gol_darah: event.target.golonganDarah.value,
			no_hp: event.target.noHp.value,
		};

		try {
			const response = await register(data);
			console.log(response);
		} catch (error) {
			setRegisterFailed(error.message);
		}
	};

	return (
		<>
			<a href="/">Back</a>
			<Form onSubmit={handleRegister}>
				<h1>Register</h1>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="namaLengkapId">
							<Form.Label>Nama Lengkap</Form.Label>
							<Form.Control
								type="text"
								placeholder="John Doe"
								name="namaLengkap"
							/>
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="emailId">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="example@example.com"
								name="email"
							/>
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="passwordId">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="********"
								name="password"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="desaId">
							<Form.Label>Desa</Form.Label>
							<Form.Select name="desa" aria-label="Default select example">
								<option>Pilih Desa</option>
								<option value="Citeras">Citeras</option>
								<option value="Rangkasbitung">Rangkasbitung</option>
								<option value="Tutul">Tutul</option>
							</Form.Select>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group className="mb-3" controlId="jenisKelaminId">
							<Form.Label>Jenis Kelamin</Form.Label>
							<Form.Select
								name="jenisKelamin"
								aria-label="Default select example">
								<option>Pilih Jenis Kelamin</option>
								<option value="Laki-Laki">Laki-Laki</option>
								<option value="Perempuan">Perempuan</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3" controlId="tanngalLahirId">
							<Form.Label>Tanggal Lahir</Form.Label>
							<Form.Control type="date" name="tanggalLahir" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="golonganDarahId">
							<Form.Label>Golongan Darah</Form.Label>
							<Form.Select
								name="golonganDarah"
								aria-label="Default select example">
								<option>Pilih Golongan Darah</option>
								<option value="o9bsy">A+</option>
								<option value="QKqRv">A-</option>
								<option value="mhkrK">AB+</option>
								<option value="uSuMT">AB-</option>
								<option value="kv-71">B+</option>
								<option value="6pGuJ">B-</option>
								<option value="kMO7s">O+</option>
								<option value="N7Fls">O-</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3" controlId="noHpId">
							<Form.Label>No Hp</Form.Label>
							<Form.Control type="text" placeholder="08xxxxxxxxx" name="noHp" />
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
					</Col>
				</Row>
				<Button variant="primary" className="mt-3" type="submit">
					Submit
				</Button>
				{registerFailed && (
					<p className="text-danger text-center">{registerFailed}</p>
				)}
			</Form>
		</>
	);
};

export default FormRegister;
