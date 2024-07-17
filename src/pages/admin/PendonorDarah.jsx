/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Table, Button, Form } from 'react-bootstrap';
// import pendonorDarahService from '../../services/admin/pendonorDarah.service';

import '../../styles/admin/pendonor-darah.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../services/config-api/config';

import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';

import acceptedBloodDonorRegistrationService from '../../services/admin/acceptedBloodDonorRegistration.service';
import rejectedBloodDonorRegistrationService from '../../services/admin/rejectedBloodDonorRegistration.service';

const PendonorDarah = () => {
	const [pendonorData, setPendonorData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [msg, setMsg] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');

	const [isButtonDisabledRegistration, setIsButtonDisabledRegistration] =
		useState({});
	const [activeRequestId, setActiveRequestId] = useState(null);

	const getPendonorData = async () => {
		try {
			const response = await axios.get(
				`${config.API_URL}/v1/admin/pendonorDarah?page=${page}&limit=${limit}`,
				{
					headers: {
						Authorization: `${localStorage.getItem('adminToken')}`,
					},
				}
			);
			const responseData = response.data;
			setPendonorData(responseData.pendonor);
			setPages(responseData.totalPage);
			setRows(responseData.totalRows);
			console.log('Berhasil menampilkan data pendonor', responseData);
		} catch (error) {
			console.log('Gagal menampilkan data pendonor', error);
		}
	};

	useEffect(() => {
		getPendonorData();
	}, [page, limit]);

	useEffect(() => {
		filterDataByMonth();
	}, [pendonorData, selectedMonth]);

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

	// fungsi untuk menonaktifkan tombol
	useEffect(() => {
		// muat status tombol dari localStorage saat komponen dimuat
		const savedButtonStatus = localStorage.getItem(
			'isButtonDisabledRegistration'
		);
		if (savedButtonStatus) {
			setIsButtonDisabledRegistration(JSON.parse(savedButtonStatus));
		}
	}, []);

	useEffect(() => {
		// simpan status tombol ke localStorage setiap kali berubah
		localStorage.setItem(
			'isButtonDisabledRegistration',
			JSON.stringify(isButtonDisabledRegistration)
		);
	}, [isButtonDisabledRegistration]);

	// accept button
	const handleAcceptedRequest = async idTraDonor => {
		try {
			// Simpan status tombol
			setIsButtonDisabledRegistration(prevStatus => ({
				...prevStatus,
				[idTraDonor]: true, // nonaktifkan tombol
			}));
			setActiveRequestId(idTraDonor);

			const data = { id_tra_donor: idTraDonor };
			const response = await acceptedBloodDonorRegistrationService(data);
			console.log('Accepted registration: ', response);

			Swal.fire({
				icon: 'success',
				title: 'Pendaftaran donor darah diterima!',
				text: 'Anda menerima pendaftaran donor darah',
			});

			// Refresh data permintaan darah setelah menerima permintaan
			getPendonorData();
		} catch (error) {
			console.error('Gagal menerima pendaftaran donor darah', error);
		}
	};

	const handleRejectedRequest = async idTraDonor => {
		try {
			// Simpan status tombol
			setIsButtonDisabledRegistration(prevStatus => ({
				...prevStatus,
				[idTraDonor]: true, // nonaktifkan tombol
			}));
			setActiveRequestId(idTraDonor);

			const data = { id_tra_donor: idTraDonor };
			const response = await rejectedBloodDonorRegistrationService(data);
			console.log('Rejected registration: ', response);

			Swal.fire({
				icon: 'success',
				title: 'Pendaftaran donor darah berhasil ditolak!',
				text: 'Anda menolak pendaftaran donor darah',
			});

			// Refresh data permintaan darah setelah menolak permintaan
			getPendonorData();
		} catch (error) {
			console.error('Gagal menolak pendaftaran donor darah', error);
		}
	};

	const handleMonthChange = event => {
		setSelectedMonth(event.target.value);
		console.log('Bulan dipilih:', event.target.value);
	};

	const filterDataByMonth = () => {
		if (selectedMonth) {
			const month = parseInt(selectedMonth.split('-')[1]);
			const filtered = pendonorData.filter(pendonor => {
				const donorMonth = new Date(pendonor.tgl_donor).getMonth() + 1;
				return donorMonth === month;
			});
			setFilteredData(filtered);
			console.log('Data setelah filter berdasarkan bulan:', filtered);
		} else {
			setFilteredData(pendonorData);
		}
	};

	// Fungsi untuk mengekspor data ke format excel
	const exportToExcel = () => {
		console.log('Data yang diekspor:', filteredData);

		const worksheet = XLSX.utils.json_to_sheet(
			filteredData.map((pendonor, index) => ({
				No: index + 1,
				NIK: pendonor.User.nik,
				Nama: pendonor.User.nama,
				'Jenis Kelamin': pendonor.User.jenis_kelamin,
				'Alamat Rumah': pendonor.User.alamat_rumah,
				Desa: pendonor.User.desa,
				Kecamatan: pendonor.User.kecamatan,
				Kota: pendonor.User.kota,
				Pekerjaan: pendonor.User.pekerjaan,
				'No Hp': pendonor.User.no_hp,
				'Tanggal Donor': formatData(pendonor.tgl_donor),
				'Golongan Darah': pendonor.GolDarah.gol_darah,
			}))
		);

		// Buat workbook dan tambahkan worksheet ke dalamnya
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Calon Pendonor Darah');

		// Ambil nama bulan dari selectedMonth (jika ada)
		let monthName = '';
		if (selectedMonth) {
			const monthNumber = parseInt(selectedMonth.split('-')[1]);
			const month = new Date(Date.UTC(2000, monthNumber - 1, 1));
			monthName = month.toLocaleString('id-ID', { month: 'long' });
		}

		// Simpan workbook ke file dengan nama dinamis berdasarkan bulan yang dipilih
		const fileName = `Calon_Pendonor_Bulan_${monthName}.xlsx`;
		XLSX.writeFile(workbook, fileName);
	};

	return (
		<div className="pendonor-darah-wrapper">
			<h1>Calon Pendonor Darah</h1>

			<div className="filter-month">
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
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{pendonorData.map((pendonor, index) => (
							<tr key={index + page * limit}>
								<td>{index + 1 + page * limit}</td>
								<td>{pendonor.User.nik}</td>
								<td>{pendonor.User.nama}</td>
								<td>{pendonor.User.jenis_kelamin}</td>
								<td>{pendonor.User.alamat_rumah}</td>
								<td>{pendonor.User.desa}</td>
								<td>{pendonor.User.kecamatan}</td>
								<td>{pendonor.User.kota}</td>
								<td>{pendonor.User.pekerjaan}</td>
								<td>{pendonor.User.no_hp}</td>
								<td>{formatData(pendonor.tgl_donor)}</td>
								<td>{pendonor.GolDarah.gol_darah}</td>
								<td colSpan="10" className="action-buttons-registration">
									<Button
										variant="primary"
										className="accepted-button"
										onClick={() => handleAcceptedRequest(pendonor.id_tra_donor)}
										disabled={
											isButtonDisabledRegistration[pendonor.id_tra_donor]
										}>
										Terima
									</Button>
									<Button
										variant="secondary"
										className="rejected-button"
										onClick={() => handleRejectedRequest(pendonor.id_tra_donor)}
										disabled={
											isButtonDisabledRegistration[pendonor.id_tra_donor]
										}>
										Tolak
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<div className="pagination-wrapper-get-pendonors">
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
			</div>
		</div>
	);
};

export default PendonorDarah;
