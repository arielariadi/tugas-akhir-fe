import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../services/register.service';
import { useState } from 'react';

import Swal from 'sweetalert2';

import '../styles/component-styles/form-register.css';

const FormRegister = () => {
	const [registerFailed, setRegisterFailed] = useState('');
	const [pekerjaan, setPekerjaan] = useState('');
	const [pekerjaanLainnya, setPekerjaanLainnya] = useState('');

	const handlePekerjaanChange = event => {
		const value = event.target.value;
		setPekerjaan(value);
		if (value !== 'Lain-lain') {
			setPekerjaanLainnya('');
		}
	};

	const handleRegister = async event => {
		event.preventDefault();

		const finalPekerjaan =
			pekerjaan === 'Lain-lain' ? pekerjaanLainnya : pekerjaan;

		const data = {
			// nama object-nya samakan dengan response api-nya
			nik: event.target.nik.value,
			nama: event.target.namaLengkap.value,
			email: event.target.email.value,
			password: event.target.password.value,
			alamat_rumah: event.target.alamatRumah.value,
			desa: event.target.desa.value,
			kecamatan: event.target.kecamatan.value,
			kota: event.target.kota.value,
			pekerjaan: finalPekerjaan,
			jenis_kelamin: event.target.jenisKelamin.value,
			tanggal_lahir: event.target.tanggalLahir.value,
			id_gol_darah: event.target.golonganDarah.value,
			no_hp: event.target.noHp.value,
		};

		try {
			const response = await register(data);
			console.log(response);

			Swal.fire({
				icon: 'success',
				title: 'Registrasi Berhasil!',
				text: 'Silakan login untuk mengakses akun Anda',
				showConfirmButton: true,
				confirmButtonText: 'OK',
			}).then(result => {
				if (result.isConfirmed) {
					window.location.href = '/login';
				}
			});
		} catch (error) {
			setRegisterFailed(error.message);
		}
	};

	return (
		<>
			<Container fluid>
				<Form onSubmit={handleRegister}>
					<Row>
						<Col className="d-flex flex-column justify-content-center align-items-center">
							<Row className="form-register-wrapper">
								<div className="button-back-register-wrapper">
									<a href="/">
										<i className="bi bi-arrow-left-circle-fill"></i>
									</a>
								</div>

								<div className="text-register-wrapper">
									<h1>Ayo Daftarkan</h1>
									<h1>Akun Kamu</h1>
								</div>

								<Col>
									<Form.Group className="mb-3" controlId="nikId">
										<Form.Label>NIK</Form.Label>
										<Form.Control type="text" name="nik" autoComplete="off" />
										<Form.Text className="text-muted"></Form.Text>
									</Form.Group>

									<Form.Group className="mb-3" controlId="namaLengkapId">
										<Form.Label>Nama Lengkap</Form.Label>
										<Form.Control
											type="text"
											placeholder="John Doe"
											name="namaLengkap"
											autoComplete="off"
										/>
										<Form.Text className="text-muted"></Form.Text>
									</Form.Group>

									<Form.Group className="mb-3" controlId="emailId">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											placeholder="example@example.com"
											name="email"
											autoComplete="off"
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

									<Form.Group className="mb-3" controlId="alamatRumahId">
										<Form.Label>Alamat Rumah</Form.Label>
										<Form.Control as="textarea" name="alamatRumah" rows={3} />
									</Form.Group>

									<Button className="button-wrapper mb-5" type="submit">
										Submit
									</Button>
								</Col>

								<Col>
									<Form.Group className="mb-3" controlId="desaId">
										<Form.Label>Desa</Form.Label>
										<Form.Control type="text" name="desa" autoComplete="off" />
									</Form.Group>

									<Form.Group className="mb-3" controlId="kecamtanId">
										<Form.Label>Kecamatan</Form.Label>
										<Form.Select
											name="kecamatan"
											aria-label="Default select example">
											<option>Pilih Kecamatan</option>
											<option value="Banjarsari">Banjarsari</option>
											<option value="Bayah">Bayah</option>
											<option value="Bojongmanik">Bojongmanik</option>
										</Form.Select>
									</Form.Group>

									<Form.Group className="mb-3" controlId="kotaId">
										<Form.Label>Kabupaten/Kota</Form.Label>
										<Form.Control type="text" name="kota" />
									</Form.Group>

									<Form.Group className="mb-3" controlId="pekerjaanId">
										<Form.Label>Pilih Pekerjaan</Form.Label>
										<Form.Select
											name="pekerjaan"
											aria-label="Default select example"
											value={pekerjaan}
											onChange={handlePekerjaanChange}>
											<option>Pilih Pekerjaan</option>
											<option value="TNI/POLRI">TNI / Polri</option>
											<option value="Pegawai Negeri/Swasta">
												Pegawai Negeri / Swasta
											</option>
											<option value="Petani/Buruh">Petani / Buruh</option>
											<option value="Wiraswasta">Wiraswasta</option>
											<option value="Mahasiswa">Mahasiswa</option>
											<option value="Pedagang">Pedagang</option>
											<option value="Lain-lain">Lain-lain</option>
										</Form.Select>
										{pekerjaan === 'Lain-lain' && (
											<Form.Control
												type="text"
												placeholder="Masukkan pekerjaan Anda"
												value={pekerjaanLainnya}
												onChange={e => setPekerjaanLainnya(e.target.value)}
												className="mt-2"
											/>
										)}
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
											<option value="W9vR1">Belum Mengetahui</option>
										</Form.Select>
									</Form.Group>

									<Form.Group className="mb-3" controlId="noHpId">
										<Form.Label>No Hp</Form.Label>
										<Form.Control
											type="text"
											placeholder="08xxxxxxxxx"
											name="noHp"
										/>
										<Form.Text className="text-muted"></Form.Text>
									</Form.Group>
								</Col>
							</Row>
						</Col>

						<Col className="image-wrapper-register min-vh-100 p-0">
							<img src="src/assets/img/login-image.png" alt="" />
						</Col>
					</Row>

					{registerFailed && (
						<p className="text-danger text-center">{registerFailed}</p>
					)}
				</Form>
			</Container>
		</>
	);
};

export default FormRegister;
