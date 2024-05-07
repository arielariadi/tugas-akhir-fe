/* eslint-disable no-unused-vars */
import { Button, Card, Modal, Form, Table } from 'react-bootstrap';
import '../styles/user/jadwal-donor-darah.css';
import daftarDonor from '../services/daftarDonor.service';
import { useState } from 'react';
import { useEffect } from 'react';
import getJadwalDonor from '../services/getJadwalDonor';
import profileUser from '../services/profileUser.service';

import getBankDarahService from '../services/admin/getBankDarah.service';

import Swal from 'sweetalert2';

const JadwalDonorDarah = () => {
	const [donorData, setDonorData] = useState([]);
	const [dataPmi, setDataPmi] = useState(null);

	const [detailPmi, setDetailPmi] = useState(null);

	// state modal daftar
	const [show, setShow] = useState(false);

	// state stok kantung darah
	const [bankDarah, SetBankDarah] = useState([]);
	const [showBankDarah, setShowBankDarah] = useState(false);

	const [selectedDate, setSelectedDate] = useState('');

	const hariIni = new Date();
	const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	const namaHariIni = hari[hariIni.getDay()];

	const handleDateChange = event => {
		setSelectedDate(event.target.value);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleCloseBankDarah = () => setShowBankDarah(false);
	const handleShowBankDarah = () => setShowBankDarah(true);

	useEffect(() => {
		const getDonorData = async () => {
			try {
				const response = await profileUser(); // ganti ke profile
				setDonorData(response.user);
			} catch (error) {
				console.log(error);
			}
		};
		getDonorData();
	}, []);

	useEffect(() => {
		const getJadwalDonorDarah = async () => {
			try {
				const response = await getJadwalDonor();
				setDetailPmi(response.data[0]); // Atur state detailPmi dengan data dari respons API

				console.log('tampilkan-jadwal', response);
			} catch (error) {
				console.log(error);
			}
		};
		getJadwalDonorDarah();
	}, []);

	// Get data bank darah
	useEffect(() => {
		const getBankDarah = async () => {
			try {
				const response = await getBankDarahService();
				const sortedBankDarah = response.stok_bank_darah.sort((a, b) => {
					// Urutkan berdasarkan nama golongan darah
					return a.gol_darah.localeCompare(b.gol_darah);
				});
				SetBankDarah(sortedBankDarah);
				console.log('bank-darah', sortedBankDarah);
			} catch (error) {
				console.log(error);
			}
		};
		getBankDarah();
	}, []);

	const handleClick = async () => {
		try {
			if (!selectedDate) {
				Swal.fire({
					icon: 'error',
					title: 'Tanggal donor belum dipilih!',
					text: 'Harap pilih tanggal donor darah terlebih dahulu',
				});
				return;
			}

			const donorData = await profileUser(); // Ambil data donor dari API profileUser
			const idUser = donorData.user.id_user;
			const idGolDarah = donorData.user.id_gol_darah;

			const postData = {
				id_user: idUser,
				id_lokasi_pmi: '4xzFX',
				id_gol_darah: idGolDarah,
				tgl_donor: selectedDate,
			};

			Swal.fire({
				icon: 'warning',
				title: 'Apakah kamu yakin ingin mendaftarkan diri untuk donor darah?',
				text: 'Data yang terkirim adalah data diri kamu',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya, Saya yakin',
			}).then(async result => {
				if (result.isConfirmed) {
					const response = await daftarDonor(postData);

					Swal.fire({
						icon: 'success',
						title: 'Pendaftaran donor darah berhasil!',
						text: 'Selamat anda berhasil mendaftarkan diri untuk donor darah',
					});

					setDataPmi(response); // Set state dataPmi dengan respons dari daftarDonor
					console.log('tanggal-donor', postData);
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="jadwal-donor-wrapper">
				<h1 className="text-center">Jadwal Donor Darah</h1>

				<div className="map-wrapper mt-4">
					<Card>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2275322181313!2d106.24663387442743!3d-6.364592562260263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e421708aa5881d1%3A0xab571713efed0688!2sUnit%20Donor%20Darah%20PMI%20Kab%20Lebak!5e0!3m2!1sid!2sid!4v1711203280359!5m2!1sid!2sid"
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"></iframe>
						<Card.Body>
							{detailPmi ? (
								<Card.Title>{detailPmi.nama_lok_pmi}</Card.Title>
							) : null}

							<div className="detail-wrapper mt-4">
								{detailPmi ? (
									<Card.Text>Alamat : {detailPmi.alamat_pmi}</Card.Text>
								) : null}
								<Card.Text>Hari : {namaHariIni}</Card.Text>
								{detailPmi &&
								detailPmi.jadwal_jam_mulai &&
								detailPmi.jadwal_jam_selesai ? (
									<Card.Text>
										Jam: {detailPmi.jadwal_jam_mulai} -{' '}
										{detailPmi.jadwal_jam_selesai}
									</Card.Text>
								) : null}
								<Card.Text>Email : udd.pmilebak@gmail.com</Card.Text>
								<Card.Text>No HP : 08xxxxxxxx</Card.Text>
							</div>

							<Button variant="primary" className="mt-2" onClick={handleShow}>
								Daftar Sekarang
							</Button>

							<Button
								variant="danger"
								className="mt-2 ms-2"
								onClick={handleShowBankDarah}>
								Bank Darah
							</Button>
						</Card.Body>
					</Card>
				</div>
			</div>

			{/* modal daftar */}
			<Modal show={show} centered onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Pilih Tanggal Donor Darah</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Group className="mb-3" controlId="tanggalDonorId">
						<Form.Label>Tanggal Donor</Form.Label>
						<Form.Control
							type="date"
							name="tanggalDonor"
							value={selectedDate}
							onChange={handleDateChange}
						/>
						<Form.Text className="text-muted"></Form.Text>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Batal
					</Button>
					<Button variant="primary" onClick={handleClick}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

			{/* modal stok darah */}
			<Modal
				show={showBankDarah}
				centered
				onHide={handleCloseBankDarah}
				className="modal-bank-darah">
				<Modal.Header closeButton>
					<Modal.Title>Informasi Bank Darah</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<h5 className="text-center">Jumlah Stok Darah</h5>
					<Table striped bordered hover className="text-center">
						<thead>
							<tr>
								{bankDarah.slice(0, 4).map((bank, index) => (
									<th key={index}>{bank.gol_darah}</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{bankDarah.slice(0, 4).map((bank, index) => (
									<td key={index}>{bank.jumlah_kantong_darah}</td>
								))}
							</tr>
						</tbody>
					</Table>

					<Table striped bordered hover className="text-center">
						<thead>
							<tr>
								{bankDarah.slice(4, 8).map((bank, index) => (
									<th key={index}>{bank.gol_darah}</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{bankDarah.slice(4, 8).map((bank, index) => (
									<td key={index}>{bank.jumlah_kantong_darah}</td>
								))}
							</tr>
						</tbody>
					</Table>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseBankDarah}>
						Tutup
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default JadwalDonorDarah;
