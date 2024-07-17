/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../services/config-api/config';

import { Table, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';

import '../../styles/admin/validasi-pendonor-darah.css';

import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';

const ValidasiPendonorDarah = () => {
	const [validasiPendonorDarahData, setValidasiPendonorDarahData] = useState(
		[]
	);

	const [alasanGagalDonor, setAlasanGagalDonor] = useState('');
	const [jumlahKantungDarah, setJumlahKantungDarah] = useState('');
	const [submittedData, setSubmittedData] = useState({});

	const [page3, setPage3] = useState(0);
	const [limit3, setLimit3] = useState(10);
	const [pages3, setPages3] = useState(0);
	const [rows3, setRows3] = useState(0);
	const [msg, setMsg] = useState('');

	const [isButtonValidationDisabled, setIsButtonValidationDisabled] = useState(
		{}
	);
	const [activeRequestId, setActiveRequestId] = useState(null);

	const [selectedMonth, setSelectedMonth] = useState('');
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		const submittedDataFromStorage =
			JSON.parse(localStorage.getItem('submittedData')) || {};
		setSubmittedData(submittedDataFromStorage);
	}, []);

	// Save submittedData to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('submittedData', JSON.stringify(submittedData));
	}, [submittedData]);

	const getValidasiPendonorDarahData = async () => {
		try {
			const response = await axios.get(
				`${config.API_URL}/v1/admin/showAcceptedCalonPendonorDarah?page=${page3}&limit=${limit3}`,
				{
					headers: {
						Authorization: `${localStorage.getItem('adminToken')}`,
					},
				}
			);

			const responseData = response.data;
			setValidasiPendonorDarahData(responseData.validasi_pendonor);
			setPages3(responseData.totalPage);
			setRows3(responseData.totalRows);
			console.log(
				'Berhasil menampilkan data validasi pendonor darah',
				responseData
			);
		} catch (error) {
			console.log('Gagal menampilkan data validasi pendonor darah', error);
		}
	};

	useEffect(() => {
		getValidasiPendonorDarahData();
	}, [page3, limit3]);

	// Filter data berdasarkan bulan untuk export ke excel
	useEffect(() => {
		filterDataByMonth();
	}, [validasiPendonorDarahData, selectedMonth]);

	const handleInputChange = (id, value, type) => {
		if (type === 'alasan') {
			setAlasanGagalDonor(prevState => ({
				...prevState,
				[id]: value,
			}));
		} else if (type === 'jumlah') {
			setJumlahKantungDarah(prevState => ({
				...prevState,
				[id]: value,
			}));
		}
	};

	// Menonaktifkan tombolnya ketika sudah diklik
	useEffect(() => {
		// Muat status tombol dari localStorage saat komponen dimuat
		const savedButtonStatus = localStorage.getItem('isButtonDisabled');
		if (savedButtonStatus) {
			setIsButtonValidationDisabled(JSON.parse(savedButtonStatus));
		}

		// Muat active request ID dari localStorage
		const savedActiveRequestId = localStorage.getItem('activeRequestId');
		if (savedActiveRequestId) {
			setActiveRequestId(JSON.parse(savedActiveRequestId));
		}
	}, []);

	useEffect(() => {
		// Simpan status tombol ke localStorage setiap kali berubah
		localStorage.setItem(
			'isButtonDisabled',
			JSON.stringify(isButtonValidationDisabled)
		);

		// Simpan active request ID ke localStorage
		if (activeRequestId !== null) {
			localStorage.setItem('activeRequestId', JSON.stringify(activeRequestId));
		}
	}, [isButtonValidationDisabled, activeRequestId]);

	const handleAcceptValidation = async id => {
		const data = {
			id_validasi_pendonor: id,
			jumlah_kantung_darah: jumlahKantungDarah[id],
			alasan_gagal_donor: alasanGagalDonor[id],
		};

		try {
			await axios.post(
				`${config.API_URL}/v1/admin/showAcceptedCalonPendonorDarah/acceptValidation`,
				data
			);

			setSubmittedData(prevState => ({
				...prevState,
				[id]: {
					jumlah_kantung_darah: jumlahKantungDarah[id],
					alasan_gagal_donor: alasanGagalDonor[id],
				},
			}));

			setJumlahKantungDarah(prevState => ({
				...prevState,
				[id]: '',
			}));

			setAlasanGagalDonor(prevState => ({
				...prevState,
				[id]: '',
			}));

			// Nonaktifkan tombol setelah diklik
			setIsButtonValidationDisabled(prevState => ({
				...prevState,
				[id]: true,
			}));

			// Set active request ID
			setActiveRequestId(id);

			Swal.fire({
				icon: 'success',
				title: 'Berhasil Melakukan Donor Darah!',
				text: 'Data sudah disimpan',
			});
		} catch (error) {
			console.error('Error submitting data:', error);
		}
	};

	const handleRejectValidation = async id => {
		const data = {
			id_validasi_pendonor: id,
			jumlah_kantung_darah: jumlahKantungDarah[id],
			alasan_gagal_donor: alasanGagalDonor[id],
		};

		try {
			await axios.post(
				`${config.API_URL}/v1/admin/showAcceptedCalonPendonorDarah/rejectValidation`,
				data
			);

			setSubmittedData(prevState => ({
				...prevState,
				[id]: {
					jumlah_kantung_darah: jumlahKantungDarah[id],
					alasan_gagal_donor: alasanGagalDonor[id],
				},
			}));

			setJumlahKantungDarah(prevState => ({
				...prevState,
				[id]: '',
			}));

			setAlasanGagalDonor(prevState => ({
				...prevState,
				[id]: '',
			}));

			// Nonaktifkan tombol setelah diklik
			setIsButtonValidationDisabled(prevState => ({
				...prevState,
				[id]: true,
			}));

			// Set active request ID
			setActiveRequestId(id);

			Swal.fire({
				icon: 'success',
				title: 'Gagal Melakukan Donor Darah!',
				text: 'Data sudah disimpan',
			});
		} catch (error) {
			console.error('Error submitting data:', error);
		}
	};

	const changePage = ({ selected }) => {
		setPage3(selected);
		if (selected === 4) {
			setMsg('Data tidak ditemukan');
		} else {
			setMsg('');
		}
	};

	const formatData = dateString => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};

	const handleMonthChange = event => {
		setSelectedMonth(event.target.value);
		console.log('Bulan dipilih:', event.target.value);
	};

	const filterDataByMonth = () => {
		if (selectedMonth) {
			const month = parseInt(selectedMonth.split('-')[1]);
			const filtered = validasiPendonorDarahData.filter(validasiPendonor => {
				const donorMonth = new Date(validasiPendonor.tgl_donor).getMonth() + 1;
				return donorMonth === month;
			});
			setFilteredData(filtered);
			console.log('Data setelah filter berdasarkan bulan:', filtered);
		} else {
			setFilteredData(validasiPendonorDarahData);
		}
	};

	const exportToExcel = () => {
		console.log('Data yang diekspor:', filteredData);

		const worksheet = XLSX.utils.json_to_sheet(
			filteredData.map((validasiPendonor, index) => ({
				No: index + 1,
				NIK: validasiPendonor.User.nik,
				Nama: validasiPendonor.User.nama,
				'Jenis Kelamin': validasiPendonor.User.jenis_kelamin,
				'Alamat Rumah': validasiPendonor.User.alamat_rumah,
				Desa: validasiPendonor.User.desa,
				Kecamatan: validasiPendonor.User.kecamatan,
				Kota: validasiPendonor.User.kota,
				Pekerjaan: validasiPendonor.User.pekerjaan,
				'No Hp': validasiPendonor.User.no_hp,
				'Tanggal Donor': formatData(validasiPendonor.tgl_donor),
				'Golongan Darah': validasiPendonor.GolDarah.gol_darah,
				'Jumlah Kantung Darah': validasiPendonor.jumlah_kantung_darah,
				'Alasan Gagal Donor': validasiPendonor.alasan_gagal_donor,
			}))
		);

		// Buat workbook dan tambahkan worksheet ke dalamnya
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(
			workbook,
			worksheet,
			'Validasi Pendonor Darah'
		);

		// Ambil nama bulan dari selectedMonth (jika ada)
		let monthName = '';
		if (selectedMonth) {
			const monthNumber = parseInt(selectedMonth.split('-')[1]);
			const month = new Date(Date.UTC(2000, monthNumber - 1, 1));
			monthName = month.toLocaleString('id-ID', { month: 'long' });
		}

		// Simpan workbook ke file dengan nama dinamis berdasarkan bulan yang dipilih
		const fileName = `Validasi_Pendonor_Darah_Bulan_${monthName}.xlsx`;
		XLSX.writeFile(workbook, fileName);
	};

	return (
		<div className="validasi-pendonor-darah-wrapper">
			<h1>Validasi Pendonor Darah</h1>

			<div className="filter-month-validation-blood-donor">
				<Form.Group controlId="filterMonth">
					<Form.Label>Filter Berdasarkan Bulan</Form.Label>
					<Form.Control
						type="month"
						value={selectedMonth}
						onChange={handleMonthChange}
					/>
				</Form.Group>

				<Button onClick={exportToExcel} className="mt-3 btn-success">
					Ekspor ke Excel
				</Button>
			</div>

			<div className="table-wrapper" style={{ overflowX: 'auto' }}>
				<Table striped>
					<thead>
						<tr>
							<th>No</th>
							<th style={{ width: '100px' }}>NIK</th>
							<th style={{ width: '500px' }}>Nama</th>
							<th style={{ width: '100px' }}>Jenis Kelamin</th>
							<th style={{ width: '270px' }}>Alamat Rumah</th>
							<th>Desa</th>
							<th>Kecamatan</th>
							<th>Kota</th>
							<th style={{ width: '150px' }}>Pekerjaan</th>
							<th>No Hp</th>
							<th style={{ width: '200px' }}>Tanggal Donor</th>
							<th>Golongan Darah</th>
							<th>Jumlah Kantung Darah</th>
							<th style={{ width: '200px' }}>Alasan Gagal Donor</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{validasiPendonorDarahData.map((validasiPendonor, index) => (
							<tr key={index + page3 * limit3}>
								<td>{index + 1 + page3 * limit3}</td>
								<td>{validasiPendonor.User.nik}</td>
								<td>{validasiPendonor.User.nama}</td>
								<td>{validasiPendonor.User.jenis_kelamin}</td>
								<td>{validasiPendonor.User.alamat_rumah}</td>
								<td>{validasiPendonor.User.desa}</td>
								<td>{validasiPendonor.User.kecamatan}</td>
								<td>{validasiPendonor.User.kota}</td>
								<td>{validasiPendonor.User.pekerjaan}</td>
								<td>{validasiPendonor.User.no_hp}</td>
								<td>{formatData(validasiPendonor.tgl_donor)}</td>
								<td>{validasiPendonor.GolDarah.gol_darah}</td>
								<td>
									{submittedData[validasiPendonor.id_validasi_pendonor] ? (
										<span>
											{
												submittedData[validasiPendonor.id_validasi_pendonor]
													.jumlah_kantung_darah
											}
										</span>
									) : (
										<Form.Control
											type="number"
											value={
												jumlahKantungDarah[
													validasiPendonor.id_validasi_pendonor
												] || ''
											}
											onChange={e =>
												handleInputChange(
													validasiPendonor.id_validasi_pendonor,
													e.target.value,
													'jumlah'
												)
											}
											name="jumlah_kantung_darah"
											autoComplete="off"
											style={{ width: '100px' }}
										/>
									)}
								</td>
								<td>
									{submittedData[validasiPendonor.id_validasi_pendonor] ? (
										<span>
											{
												submittedData[validasiPendonor.id_validasi_pendonor]
													.alasan_gagal_donor
											}
										</span>
									) : (
										<FloatingLabel>
											<Form.Control
												as="textarea"
												value={
													alasanGagalDonor[
														validasiPendonor.id_validasi_pendonor
													] || ''
												}
												onChange={e =>
													handleInputChange(
														validasiPendonor.id_validasi_pendonor,
														e.target.value,
														'alasan'
													)
												}
												name="alasan_gagal_donor"
												autoComplete="off"
												style={{ height: '100px', width: '300px' }}
											/>
										</FloatingLabel>
									)}
								</td>
								<td colSpan="10" className="action-buttons-registration">
									<Button
										variant="primary"
										className="accepted-button"
										style={{ width: '150px' }}
										onClick={() =>
											handleAcceptValidation(
												validasiPendonor.id_validasi_pendonor
											)
										}
										disabled={
											isButtonValidationDisabled[
												validasiPendonor.id_validasi_pendonor
											] ||
											activeRequestId === validasiPendonor.id_validasi_pendonor
										}>
										Sudah Donor
									</Button>

									<Button
										variant="danger"
										className="rejected-button mt-2"
										style={{ width: '150px' }}
										onClick={() =>
											handleRejectValidation(
												validasiPendonor.id_validasi_pendonor
											)
										}
										disabled={
											isButtonValidationDisabled[
												validasiPendonor.id_validasi_pendonor
											] ||
											activeRequestId === validasiPendonor.id_validasi_pendonor
										}>
										Gagal Donor
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<div className="pagination-wrapper-get-validation-blood-donor">
					<p>Jumlah data: {rows3}</p>
					<p>
						Halaman {rows3 ? page3 + 1 : 0} dari {pages3}
					</p>
					<ReactPaginate
						pageCount={pages3 || 0} // Menggunakan nilai pages atau 0 jika pages adalah falsy
						onPageChange={changePage}
						containerClassName={'pagination'}
						activeClassName={'active'}
						pageLinkClassName={'page-link'}
						previousLinkClassName={'page-link'}
						nextLinkClassName={'page-link'}
						breakLinkClassName={'page-link'}
						disabledClassName={'disabled'}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						previousLabel={'Previous'}
						nextLabel={'Next'}
					/>
				</div>
			</div>
		</div>
	);
};

export default ValidasiPendonorDarah;
