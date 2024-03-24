import { Button, Form } from 'react-bootstrap';

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

			// perbarui userData dengan id_gol_darah yang baru
			setUserData({ ...userData, id_gol_darah: idGolonganDarah });

			// kirim permintaan pembaruan data user dengan updateProfileUser
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
			<div className="main-wrapper">
				<h1 className="text-center">Profile User</h1>

				<Form.Group className="mb-3" controlId="namaLengkapId">
					<Form.Label>Nama Lengkap</Form.Label>
					<Form.Control
						type="text"
						placeholder="John Doe"
						name="namaLengkap"
						value={userData.nama || ''}
						onChange={e => setUserData({ ...userData, nama: e.target.value })}
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
						onChange={e => setUserData({ ...userData, email: e.target.value })}
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="desaId">
					<Form.Label>Desa</Form.Label>
					<Form.Select
						name="desa"
						aria-label="Default select example"
						value={userData.alamat || ''}
						onChange={e =>
							setUserData({ ...userData, alamat: e.target.value })
						}>
						<option>{userData.alamat || 'Pilih Desa'}</option>
						<option value="Citeras">Citeras</option>
						<option value="Rangkasbitung">Rangkasbitung</option>
						<option value="Tutul">Tutul</option>
					</Form.Select>
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
						<option>{userData.jenis_kelamin || 'Pilih Jenis Kelamin'}</option>
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
						<option>{userData.gol_darah || 'Pilih Golongan Darah'}</option>
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
					<Form.Control
						type="text"
						placeholder="08xxxxxxxxx"
						name="noHp"
						value={userData.no_hp || ''}
						onChange={e => setUserData({ ...userData, no_hp: e.target.value })}
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
					className="mt-4"
					variant="primary"
					type="submit"
					onClick={handleSaveButtonClick}>
					Simpan
				</Button>
			</div>
		</>
	);
};

export default ProfileUser;
