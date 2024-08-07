/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../services/config-api/config';

import { Table, Button, Modal, Form } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';

import acceptedBloodRequestService from '../../services/admin/acceptedBloodRequest.service';
import rejectedBloodRequestService from '../../services/admin/rejectedBloodRequest.service';

import Swal from 'sweetalert2';
import '../../styles/admin/daftar-permintaan-darah.css';

import * as XLSX from 'xlsx';

const DaftarPermintaanDarah = () => {
	const [permintaanDarahData, setPermintaanDarahData] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);

	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [msg, setMsg] = useState('');

	const [show, setShow] = useState(false);

	const [isButtonDisabled, setIsButtonDisabled] = useState({});
	const [activeRequestId, setActiveRequestId] = useState(null);

	// bukti foto
	const [file, setFile] = useState();

	const [selectedImageBuktiFoto, setSelectedImageBuktiFoto] = useState(null);

	const [selectedMonth, setSelectedMonth] = useState('');
	const [filteredData, setFilteredData] = useState([]);

	const getPermintaanDarahData = async () => {
		try {
			const response = await axios.get(
				`${config.API_URL}/v1/admin/requestDarah?page=${page}&limit=${limit}`,
				{
					headers: {
						Authorization: `${localStorage.getItem('adminToken')}`,
					},
				}
			);
			const responseData = response.data.bloodRequestsData;
			setPermintaanDarahData(responseData);
			setPages(response.data.totalPage);
			setRows(response.data.totalRows);

			console.log('Berhasil menemukan data permintaan darah', responseData);
		} catch (error) {
			console.log('Gagal menemukan data permintaan darah', error);
		}
	};

	useEffect(() => {
		getPermintaanDarahData();
	}, [page, limit]);

	// Filter data berdasarkan bulan untuk export ke excel
	useEffect(() => {
		filterDataByMonth();
	}, [permintaanDarahData, selectedMonth]);

	const changePage = ({ selected }) => {
		setPage(selected);
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

	const handleImageClick = imageUrl => {
		setSelectedImage(imageUrl);
		setShow(true);
	};

	const handleCloseImage = () => {
		setSelectedImage(null);
		setShow(false);
	};

	const handleImageClickBuktiFoto = imageUrl => {
		setSelectedImageBuktiFoto(imageUrl);
		setShow(true);
	};

	const handleCloseImageBuktiFoto = () => {
		setSelectedImageBuktiFoto(null);
		setShow(false);
	};

	useEffect(() => {
		// muat status tombol dari localStorage saat komponen dimuat
		const savedButtonStatus = localStorage.getItem('isButtonDisabled');
		if (savedButtonStatus) {
			setIsButtonDisabled(JSON.parse(savedButtonStatus));
		}
	}, []);

	useEffect(() => {
		// simpan status tombol ke localStorage setiap kali berubah
		localStorage.setItem('isButtonDisabled', JSON.stringify(isButtonDisabled));
	}, [isButtonDisabled]);

	const handleFile = event => {
		const uploadedFile = event.target.files[0];
		console.log('File yang diunggah:', uploadedFile.name);
		setFile(uploadedFile);
	};

	const handleAcceptedRequest = async idRequestDarah => {
		if (!file) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Silahkan pilih foto untuk bukti penerimaan terlebih dahulu!',
			});
			return;
		}

		try {
			const formData = new FormData();
			formData.append('bukti_foto', file);
			formData.append('id_request_darah', idRequestDarah);

			// Simpan status tombol
			setIsButtonDisabled(prevStatus => ({
				...prevStatus,
				[idRequestDarah]: true, // nonaktifkan tombol
			}));
			setActiveRequestId(idRequestDarah);

			const response = await acceptedBloodRequestService(formData);
			console.log('Accepted request: ', response);

			Swal.fire({
				icon: 'success',
				title: 'Permintaan darah berhasil diterima!',
				text: 'Anda menerima permintaan darah',
			});

			// Refresh data permintaan darah setelah menerima permintaan
			getPermintaanDarahData();
		} catch (error) {
			console.error('Gagal menerima permintaan darah', error);
		}
	};

	const handleRejectedRequest = async idRequestDarah => {
		try {
			// Simpan status tombol
			setIsButtonDisabled(prevStatus => ({
				...prevStatus,
				[idRequestDarah]: true, // nonaktifkan tombol
			}));
			setActiveRequestId(idRequestDarah);

			const data = { id_request_darah: idRequestDarah };
			const response = await rejectedBloodRequestService(data);
			console.log('Rejected request: ', response);

			Swal.fire({
				icon: 'success',
				title: 'Permintaan darah berhasil ditolak!',
				text: 'Anda menolak permintaan darah',
			});

			// Refresh data permintaan darah setelah menolak permintaan
			getPermintaanDarahData();
		} catch (error) {
			console.error('Gagal menolak permintaan darah', error);
		}
	};

	const handleMonthChange = event => {
		setSelectedMonth(event.target.value);
		console.log('Bulan dipilih:', event.target.value);
	};

	const filterDataByMonth = () => {
		if (selectedMonth) {
			const month = parseInt(selectedMonth.split('-')[1]);
			const filtered = permintaanDarahData.filter(permintaanDarah => {
				const donorMonth =
					new Date(permintaanDarah.tanggal_request_darah).getMonth() + 1;
				return donorMonth === month;
			});
			setFilteredData(filtered);
			console.log('Data setelah filter berdasarkan bulan:', filtered);
		} else {
			setFilteredData(permintaanDarahData);
		}
	};

	const exportToExcel = () => {
		console.log('Data yang diekspor:', filteredData);

		const worksheet = XLSX.utils.json_to_sheet(
			filteredData.map((permintaanDarah, index) => ({
				No: index + 1,
				Nama: permintaanDarah.User.nama,
				'Nama Pasien': permintaanDarah.nama_pasien,
				'Rumah Sakit': permintaanDarah.rumah_sakit,
				'Alamat Rumah': permintaanDarah.User.alamat_rumah,
				Desa: permintaanDarah.User.desa,
				Kecamatan: permintaanDarah.User.kecamatan,
				Kota: permintaanDarah.User.kota,
				'Golongan Darah': permintaanDarah.GolDarah.gol_darah,
				'Jumlah Kantung Darah': permintaanDarah.jumlah_darah,
				'Komponen Darah': permintaanDarah.komponen_darah,
				Deskripsi: permintaanDarah.deskripsi,
				'Tanggal Permintaan': formatData(permintaanDarah.tanggal_request_darah),
				'Surat Permohonan': permintaanDarah.surat_permohonan_image
					? `http://127.0.0.1:3000/images/${permintaanDarah.surat_permohonan_image}`
					: 'N/A',
				'Bukti Penerimaan': permintaanDarah.bukti_foto
					? `http://127.0.0.1:3000/bukti-foto/${permintaanDarah.bukti_foto}`
					: 'N/A',
			}))
		);

		// Buat workbook dan tambahkan worksheet ke dalamnya
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Permintaan Darah');

		// Ambil nama bulan dari selectedMonth (jika ada)
		let monthName = '';
		if (selectedMonth) {
			const monthNumber = parseInt(selectedMonth.split('-')[1]);
			const month = new Date(Date.UTC(2000, monthNumber - 1, 1));
			monthName = month.toLocaleString('id-ID', { month: 'long' });
		}

		// Simpan workbook ke file dengan nama dinamis berdasarkan bulan yang dipilih
		const fileName = `Permintaan_Darah_Bulan_${monthName}.xlsx`;
		XLSX.writeFile(workbook, fileName);
	};

	return (
		<div className="permintaan-darah-wrapper">
			<h1>Permintaan Darah</h1>

			<div className="filter-month-blood-request">
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
				<Table striped className="blood-request-table">
					<thead>
						<tr>
							<th>No</th>
							<th style={{ width: '300px' }}>Nama Pemohon</th>
							<th style={{ width: '200px' }}>Nama Pasien</th>
							<th style={{ width: '200px' }}>Rumah Sakit</th>
							<th style={{ width: '300px' }}>Alamat Rumah</th>
							<th>Desa</th>
							<th>Kecamatan</th>
							<th>Kota</th>
							<th>Golongan Darah</th>
							<th>Jumlah</th>
							<th>Komponen Darah</th>
							<th style={{ width: '300px' }}>Deskripsi</th>
							<th>Tanggal Permintaan</th>
							<th style={{ width: '100px' }}>Surat Permohonan</th>
							<th style={{ width: '200px' }}>Bukti Penerimaan</th>
							<th style={{ width: '100px' }}>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{permintaanDarahData && permintaanDarahData.length > 0 ? (
							permintaanDarahData.map((permintaanDarah, index) => (
								<tr key={index + page * limit}>
									<td>{index + 1 + page * limit}</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.User.nama}
									</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.nama_pasien}
									</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.rumah_sakit}
									</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.User.alamat_rumah}
									</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.User.desa}
									</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.User.kecamatan}
									</td>
									<td style={{ textAlign: 'center' }}>
										{permintaanDarah.User.kota}
									</td>
									<td>{permintaanDarah.GolDarah.gol_darah}</td>
									<td>{permintaanDarah.jumlah_darah}</td>
									<td>{permintaanDarah.komponen_darah}</td>
									<td>{permintaanDarah.deskripsi}</td>
									<td>{formatData(permintaanDarah.tanggal_request_darah)}</td>
									<td className="surat-permohonan">
										{permintaanDarah.surat_permohonan_image && (
											<img
												src={
													`http://127.0.0.1:3000/images/` +
													permintaanDarah.surat_permohonan_image
												}
												alt="Surat Permohonan"
												onClick={() =>
													handleImageClick(
														`http://127.0.0.1:3000/images/` +
															permintaanDarah.surat_permohonan_image
													)
												}
											/>
										)}
									</td>

									{permintaanDarah.status === 2 && (
										<td
											key={`bukti_foto_${permintaanDarah.id_request_darah}`}
											className="bukti-foto">
											<img
												src={
													`http://127.0.0.1:3000/bukti-foto/` +
													permintaanDarah.bukti_foto
												}
												alt="Bukti Penerimaan"
												onClick={() =>
													handleImageClickBuktiFoto(
														`http://127.0.0.1:3000/bukti-foto/` +
															permintaanDarah.bukti_foto
													)
												}
											/>
										</td>
									)}
									{permintaanDarah.status !== 2 && (
										<td key={`bukti_foto_${permintaanDarah.id_request_darah}`}>
											<Form.Control
												type="file"
												encType="multipart/form-data"
												onChange={handleFile}
												name="suratPermohonan"
											/>
										</td>
									)}

									<td colSpan="10" className="action-buttons">
										<Button
											variant="primary"
											className="accepted-button"
											onClick={() =>
												handleAcceptedRequest(permintaanDarah.id_request_darah)
											}
											disabled={
												isButtonDisabled[permintaanDarah.id_request_darah]
											}>
											Terima
										</Button>
										<Button
											variant="secondary"
											className="rejected-button"
											onClick={() =>
												handleRejectedRequest(permintaanDarah.id_request_darah)
											}
											disabled={
												isButtonDisabled[permintaanDarah.id_request_darah]
											}>
											Tolak
										</Button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="10">No data available</td>
							</tr>
						)}
					</tbody>
				</Table>

				<div className="pagination-wrapper-get-blood-requests">
					<p>Jumlah data: {rows}</p>
					<p>
						Halaman {rows ? page + 1 : 0} dari {pages}
					</p>
					<ReactPaginate
						pageCount={pages || 0} // Menggunakan nilai pages atau 0 jika pages adalah falsy
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

				{selectedImage && (
					<Modal
						show={show}
						onHide={handleCloseImage}
						centered
						className="modal-surat-permohonan">
						<Modal.Header closeButton>
							<Modal.Title>Surat Permohonan</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<img src={selectedImage} alt="Surat Permohonan" />
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseImage}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				)}

				{selectedImageBuktiFoto && (
					<Modal
						show={show}
						onHide={handleCloseImage}
						centered
						className="modal-bukti-foto">
						<Modal.Header closeButton>
							<Modal.Title>Bukti Penerimaan</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<img src={selectedImageBuktiFoto} alt="Bukti Penerimaan" />
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseImage}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default DaftarPermintaanDarah;
