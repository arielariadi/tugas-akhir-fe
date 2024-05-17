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
			const desa = document.querySelector('[name="desa"]').value;

			const response = await cariSukarelawan({
				id_gol_darah: golonganDarah,
				desa: desa,
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
					<Form.Group className="mb-3" controlId="desaId">
						<Form.Label>Desa</Form.Label>
						<Form.Select name="desa" aria-label="Default select example">
							<option>Pilih Desa</option>
							<option value="Citeras">Citeras</option>
							<option value="Rangkasbitung">Rangkasbitung</option>
							<option value="Tutul">Tutul</option>
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
										<Card.Text>Alamat: {sukarelawan.desa}</Card.Text>
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
