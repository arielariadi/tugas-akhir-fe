import { Button, Card, Form } from 'react-bootstrap';
import '../styles/user/cari-sukarelawan.css';
import { useState } from 'react';
import cariSukarelawan from '../services/cariSukarelawan.service';
import Swal from 'sweetalert2';

const CariSukarelawan = () => {
	const [sukarelawanData, setSukarelawanData] = useState([]);
	const [isSukareelawanFound, setIsSukarelawanFound] = useState(false);

	const handleCariSukarelawan = async () => {
		try {
			const golonganDarah = document.querySelector(
				'[name="golonganDarah"]'
			).value;
			const kecamatan = document.querySelector('[name="kecamatan"]').value;

			const response = await cariSukarelawan({
				id_gol_darah: golonganDarah,
				kecamatan: kecamatan,
			});

			if (response.length === 0) {
				setIsSukarelawanFound(false);
				Swal.fire({
					icon: 'error',
					title: 'Sukarelawan tidak ditemukan',
					text: 'Maaf, tidak ada sukarelawan yang ditemukan dengan kriteria yang dimasukkan!',
				});
			} else {
				setIsSukarelawanFound(true);
				Swal.fire({
					icon: 'success',
					title: 'Sukarelawan telah ditemukan',
					text: 'Silakan hubungi jika anda membutuhkan darah!',
				});
				setSukarelawanData(response);
			}

			console.log('data-sukarelawan', response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="volunteer-main-wrapper">
				<div className="volunteer-form-wrapper">
					<h1 className="text-center">Cari Sukarelawan</h1>

					<Form.Group className="mb-3 mt-4" controlId="golonganDarahId">
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
					<Form.Group className="mb-3" controlId="kecamatanId">
						<Form.Label>Kecamatan</Form.Label>
						<Form.Select name="kecamatan" aria-label="Default select example">
							<option>Pilih Kecamatan</option>
							<option value="Banjarsari">Banjarsari</option>
							<option value="Bayah">Bayah</option>
							<option value="Bojongmanik">Bojongmanik</option>
							<option value="Cibadak">Cibadak</option>
							<option value="Cibeber">Cibeber</option>
							<option value="Cigemblong">Cigemblong</option>
							<option value="Cihara">Cihara</option>
							<option value="Cijaku">Cijaku</option>
							<option value="Cikulur">Cikulur</option>
							<option value="Cileles">Cileles</option>
							<option value="Cilograng">Cilograng</option>
							<option value="Cimarga">Cimarga</option>
							<option value="Cipanas">Cipanas</option>
							<option value="Cirinten">Cirinten</option>
							<option value="Curugbitung">Curugbitung</option>
							<option value="Gunungkencana">Gunungkencana</option>
							<option value="Kalang Anyar">Kalang Anyar</option>
							<option value="Lebak Gedong">Lebak Gedong</option>
							<option value="Leuwidamar">Leuwidamar</option>
							<option value="Maja">Maja</option>
							<option value="Malingping">Malingping</option>
							<option value="Muncang">Muncang</option>
							<option value="Panggarangan">Panggarangan</option>
							<option value="Rangkasbitung">Rangkasbitung</option>
							<option value="Sajira">Sajira</option>
							<option value="Sobang">Sobang</option>
							<option value="Wanasalam">Wanasalam</option>
							<option value="Warunggunung">Warunggunung</option>
						</Form.Select>
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						className="search-button"
						onClick={handleCariSukarelawan}>
						Cari Sukarelawan
					</Button>

					{isSukareelawanFound && (
						<div className="card-wrapper">
							{sukarelawanData.map((sukarelawan, index) => (
								<Card key={index}>
									<Card.Body>
										<Card.Title>{sukarelawan.nama}</Card.Title>
										<Card.Text>
											Golongan darah: {sukarelawan.gol_darah}
										</Card.Text>
										<Card.Text>Kecamatan: {sukarelawan.kecamatan}</Card.Text>
										<Card.Text>Email: {sukarelawan.email}</Card.Text>
										<Card.Text>No Hp: {sukarelawan.no_hp}</Card.Text>
									</Card.Body>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CariSukarelawan;
