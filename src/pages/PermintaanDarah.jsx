import { Button, Form, Container } from 'react-bootstrap';

import permintaanDarahService from '../services/permintaanDarah.service';

import '../styles/user/permintaan-darah.css';
import { useState } from 'react';

const PermintaanDarah = () => {
	const [file, setFile] = useState();

	const handleSubmit = async event => {
		event.preventDefault();

		const data = new FormData();
		data.append('id_gol_darah', event.target.golonganDarah.value);
		data.append('jumlah_darah', event.target.jumlahDarah.value);
		data.append('deskripsi', event.target.deskripsi.value);
		data.append('surat_permohonan_image', file);

		try {
			const response = await permintaanDarahService(data);
			console.log('response api', response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFile = event => {
		setFile(event.target.files[0]);
	};

	return (
		<>
			<Container>
				<div className="permintaan-darah-wrapper">
					<h1 className="text-center">Permintaan Darah</h1>
				</div>

				<Form onSubmit={handleSubmit}>
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

					<Form.Group className="mb-3" controlId="jumlahKantongDarahId">
						<Form.Label>Jumlah Kantong Darah</Form.Label>
						<Form.Control type="number" name="jumlahDarah" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="deskripsiId">
						<Form.Label>Deskripsi</Form.Label>
						<Form.Control as="textarea" rows={3} name="deskripsi" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="suratPermohonanId">
						<Form.Label>Surat Permohonan</Form.Label>
						<Form.Control
							type="file"
							encType="multipart/form-data"
							onChange={handleFile}
							name="suratPermohonan"
						/>
					</Form.Group>

					<Button className="button-wrapper" type="submit">
						Kirim
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default PermintaanDarah;
