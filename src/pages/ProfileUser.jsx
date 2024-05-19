import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { debounce } from 'lodash';

import '../styles/user/profile-user.css';
import { useState, useEffect } from 'react';
import profileUser from '../services/profileUser.service';
import updateProfileUser from '../services/updateProfileUser.service';

import Swal from 'sweetalert2';

const ProfileUser = () => {
	// State untuk menyimpan data user
	const [userData, setUserData] = useState({});

	// State untuk menyimpan status sukarelawan
	const [statusSukarelawan, setStatusSukarelawan] = useState('');

	// State untuk menyimpan pekerjaan lainnya
	const [pekerjaanLainnya, setPekerjaanLainnya] = useState('');

	const handlePekerjaanLainnyaChange = event => {
		setPekerjaanLainnya(event.target.value);
		debouncedUpdateUserData(event.target.value);
	};

	const debouncedUpdateUserData = debounce(value => {
		setUserData(prevState => ({
			...prevState,
			pekerjaan: value,
		}));
	}, 5000);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await profileUser();
				console.log('get data', response);
				setUserData(response.user);

				setStatusSukarelawan(response.user.sts_volunteer);
			} catch (error) {
				console.log(error);
			}
		};
		getUserData();
	}, []);

	// Fungsi untuk mengubah status sukarelawan
	const handleChangeStatusSukarelawan = value => {
		setStatusSukarelawan(value);
		setUserData({ ...userData, sts_volunteer: value });
	};

	// Fungsi untuk menangani klik tombol "Simpan"
	const handleSaveButtonClick = async () => {
		try {
			let idGolonganDarah;
			switch (userData.gol_darah) {
				case 'A+':
					idGolonganDarah = 'o9bsy';
					break;
				case 'A-':
					idGolonganDarah = 'QKqRv';
					break;
				case 'AB+':
					idGolonganDarah = 'mhkrK';
					break;
				case 'AB-':
					idGolonganDarah = 'uSuMT';
					break;
				case 'B+':
					idGolonganDarah = 'kv-71';
					break;
				case 'B-':
					idGolonganDarah = '6pGuJ';
					break;
				case 'O+':
					idGolonganDarah = 'kMO7s';
					break;
				case 'O-':
					idGolonganDarah = 'N7Fls';
					break;
				default:
					idGolonganDarah = '';
			}
			// Tentukan pekerjaan final
			const finalPekerjaan =
				userData.pekerjaan === 'Lain-lain'
					? pekerjaanLainnya
					: userData.pekerjaan;

			// Perbarui userData dengan id_gol_darah yang baru
			setUserData({
				...userData,
				id_gol_darah: idGolonganDarah,
				pekerjaan: finalPekerjaan,
			});

			// Kirim permintaan pembaruan data user dengan updateProfileUser
			const response = await updateProfileUser(userData);

			if (response.lenght === 0) {
				Swal.fire({
					icon: 'error',
					title: 'Data user gagal diperbarui',
					text: 'Maaf, data user gagal diperbarui.',
				});
			} else {
				Swal.fire({
					icon: 'success',
					title: 'Data user berhasil diperbarui',
					text: 'Selamat data user berhasil diperbarui.',
				});
				console.log('data user berhasil diperbarui', response);
			}
		} catch (error) {
			console.error('Gagal memperbarui data user:', error);
		}
	};

	return (
		<>
			<Container>
				<h1 className="text-center" style={{ marginTop: '100px' }}>
					Profile User
				</h1>
				<Row className="mt-5 border profile-row">
					<Col
						className="profile-col-left"
						style={{ borderRight: '1px solid #ccc' }}>
						<div className="profile-main-wrapper-left">
							<div className="user-image d-flex justify-content-center mt-5">
								<img
									src="src/assets/img/user-default-icon.jpg"
									alt="User Image"
									className="img-fluid"
								/>
							</div>

							<div className="user-details">
								<h2 className="text-center">{userData.nama || ''}</h2>
							</div>
						</div>
					</Col>

					<Col className="mt-5 profile-col-right">
						<div className="profile-main-wrapper-right">
							<Form.Group className="mb-3" controlId="namaLengkapId">
								<Form.Label>Nama Lengkap</Form.Label>
								<Form.Control
									type="text"
									placeholder="John Doe"
									name="namaLengkap"
									value={userData.nama || ''}
									onChange={e =>
										setUserData({ ...userData, nama: e.target.value })
									}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="emailId">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="example@example.com"
									name="email"
									value={userData.email || ''}
									onChange={e =>
										setUserData({ ...userData, email: e.target.value })
									}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="alamatRumahId">
								<Form.Label>Alamat Rumah</Form.Label>
								<Form.Control
									type="text"
									name="alamatRumah"
									value={userData.alamat_rumah || ''}
									onChange={e =>
										setUserData({ ...userData, alamat_rumah: e.target.value })
									}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="desaId">
								<Form.Label>Desa</Form.Label>
								<Form.Control
									type="text"
									name="desa"
									aria-label="Default select example"
									value={userData.desa || ''}
									onChange={e =>
										setUserData({ ...userData, desa: e.target.value })
									}></Form.Control>
							</Form.Group>

							<Form.Group className="mb-3" controlId="kecamatanId">
								<Form.Label>Kecamatan</Form.Label>
								<Form.Select
									name="kecamatan"
									aria-label="Default select example"
									value={userData.kecamatan || ''}
									onChange={e =>
										setUserData({ ...userData, kecamatan: e.target.value })
									}>
									<option>{userData.kecamatan || 'Pilih Kecamatan'}</option>
									<option value="Banjarsari">Banjarsari</option>
									<option value="Bayah">Bayah</option>
									<option value="Bojongmanik">Bojongmanik</option>
								</Form.Select>
							</Form.Group>

							<Form.Group className="mb-3" controlId="kotaId">
								<Form.Label>Kabupaten / Kota</Form.Label>
								<Form.Control
									type="text"
									name="kota"
									aria-label="Default select example"
									value={userData.kota || ''}
									onChange={e =>
										setUserData({ ...userData, kota: e.target.value })
									}></Form.Control>
							</Form.Group>

							<Form.Group className="mb-3" controlId="jenisKelaminId">
								<Form.Label>Jenis Kelamin</Form.Label>
								<Form.Select
									name="jenisKelamin"
									aria-label="Default select example"
									value={userData.jenis_kelamin || ''}
									onChange={e =>
										setUserData({ ...userData, jenis_kelamin: e.target.value })
									}>
									<option>
										{userData.jenis_kelamin || 'Pilih Jenis Kelamin'}
									</option>
									<option value="Laki-Laki">Laki-Laki</option>
									<option value="Perempuan">Perempuan</option>
								</Form.Select>
							</Form.Group>

							<Form.Group className="mb-3" controlId="tanngalLahirId">
								<Form.Label>Tanggal Lahir</Form.Label>
								<Form.Control
									type="date"
									name="tanggalLahir"
									value={userData.tanggal_lahir || ''}
									onChange={e =>
										setUserData({ ...userData, tanggal_lahir: e.target.value })
									}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="pekerjaanId">
								<Form.Label>Pekerjaan</Form.Label>
								<Form.Select
									name="pekerjaan"
									aria-label="Default select example"
									value={userData.pekerjaan || ''}
									onChange={e =>
										setUserData({ ...userData, pekerjaan: e.target.value })
									}>
									<option>{userData.pekerjaan || 'Pilih Pekerjaan'}</option>
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
								{userData.pekerjaan === 'Lain-lain' && (
									<Form.Control
										type="text"
										name="pekerjaanLainnya"
										value={pekerjaanLainnya}
										onChange={handlePekerjaanLainnyaChange}
										className="mt-2"
									/>
								)}
							</Form.Group>

							<Form.Group className="mb-3" controlId="golonganDarahId">
								<Form.Label>Golongan Darah</Form.Label>
								<Form.Select
									name="golonganDarah"
									aria-label="Default select example"
									value={userData.id_gol_darah || ''}
									onChange={e => {
										const selectedBloodType =
											e.target.options[e.target.selectedIndex].text;
										const idGolonganDarah = e.target.value;

										setUserData(prevUserData => ({
											...prevUserData,
											gol_darah: selectedBloodType,
											id_gol_darah: idGolonganDarah,
										}));
									}}>
									<option>
										{userData.gol_darah || 'Pilih Golongan Darah'}
									</option>
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
									value={userData.no_hp || ''}
									onChange={e =>
										setUserData({ ...userData, no_hp: e.target.value })
									}
								/>
								<Form.Text className="text-muted"></Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="noHpId">
								<Form.Label>Status Sukarelawan</Form.Label>
								{['radio'].map(type => (
									<div key={`default-${type}`} className="mb-3">
										<Form.Check
											type={type}
											name="statusSukarelawan"
											id={'bersediaId'}
											label={'Bersedia'}
											checked={statusSukarelawan === 1}
											onChange={() => handleChangeStatusSukarelawan(1)}
										/>

										<Form.Check
											type={type}
											name="statusSukarelawan"
											id={'tidakBersediaId'}
											label={'Tidak Bersedia'}
											checked={statusSukarelawan === 0}
											onChange={() => handleChangeStatusSukarelawan(0)}
										/>
									</div>
								))}
							</Form.Group>

							<Button
								className="mt-4 mb-4"
								variant="primary"
								type="submit"
								onClick={handleSaveButtonClick}>
								Simpan
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ProfileUser;
