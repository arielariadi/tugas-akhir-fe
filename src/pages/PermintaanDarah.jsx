import { useState } from 'react';

import { Button, Form, Container } from 'react-bootstrap';

import permintaanDarahService from '../services/permintaanDarah.service';

import Swal from 'sweetalert2';

import '../styles/user/permintaan-darah.css';

const PermintaanDarah = () => {
	const [file, setFile] = useState();

	const handleSubmit = async event => {
		event.preventDefault();

		const data = new FormData();
		data.append('nama_pasien', event.target.namaPasien.value);
		data.append('rumah_sakit', event.target.rumahSakit.value);
		data.append('id_gol_darah', event.target.golonganDarah.value);
		data.append('komponen_darah', event.target.komponenDarah.value);
		data.append('jumlah_darah', event.target.jumlahDarah.value);
		data.append('deskripsi', event.target.deskripsi.value);
		data.append('surat_permohonan_image', file);

		try {
			Swal.fire({
				icon: 'warning',
				title: 'Apakah kamu yakin ingin request permintaan kantung darah?',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya, Saya Yakin',
			}).then(async result => {
				if (result.isConfirmed) {
					const response = await permintaanDarahService(data);

					Swal.fire({
						icon: 'success',
						title: 'Permintaan kantung darah berhasil!',
						text: 'Mohon tunggu konfirmasi dari admin',
					});

					console.log('response api', response);
				}
			});
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
				<div className="permintaan-darah-wrapper-user">
					<h1 className="text-center">Permintaan Darah</h1>
				</div>

				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="namaPasienId">
						<Form.Label>Nama Pasien</Form.Label>
						<Form.Control type="text" name="namaPasien" autoComplete="off" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="rumahSakitId">
						<Form.Label>Nama Rumah Sakit</Form.Label>
						<Form.Control type="text" name="rumahSakit" autoComplete="off" />
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

					<Form.Group className="mb-3" controlId="komponenDarahId">
						<Form.Label>Komponen Darah</Form.Label>
						<Form.Select
							name="komponenDarah"
							aria-label="Default select example">
							<option>Pilih Komponen Darah</option>
							<option value="Packed Red Cell">Packed Red Cell (PRC)</option>
							<option value="Trombocyte Concentrate">
								Trombocyte Concentrate (TC)
							</option>
							<option value="Fresh Frozen Plasma">
								Fresh Frozen Plasma (FFP)
							</option>
							<option value="Cryoprecipitate">Cryoprecipitate</option>
						</Form.Select>
					</Form.Group>

					<Form.Group className="mb-3" controlId="jumlahKantongDarahId">
						<Form.Label>Jumlah Kantung Darah</Form.Label>
						<Form.Control type="number" name="jumlahDarah" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="deskripsiId">
						<Form.Label>Alasan</Form.Label>
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
