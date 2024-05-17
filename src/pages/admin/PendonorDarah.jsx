/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Table, Button } from 'react-bootstrap';
// import pendonorDarahService from '../../services/admin/pendonorDarah.service';

import '../../styles/admin/pendonor-darah.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../services/config-api/config';

import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

import acceptedBloodDonorRegistrationService from '../../services/admin/acceptedBloodDonorRegistration.service';
import rejectedBloodDonorRegistrationService from '../../services/admin/rejectedBloodDonorRegistration.service';

const PendonorDarah = () => {
	const [pendonorData, setPendonorData] = useState([]);

	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [msg, setMsg] = useState('');

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

	return (
		<div className="pendonor-darah-wrapper">
			<h1>Pendonor Darah</h1>

			<div className="table-wrapper">
				<Table striped>
					<thead>
						<tr>
							<th style={{ width: '2%' }}>No</th>
							<th style={{ width: '15%' }}>Nama</th>
							<th style={{ width: '20%' }}>Jenis Kelamin</th>
							<th style={{ width: '15%' }}>Kecamatan</th>
							<th style={{ width: '10%' }}>No Hp</th>
							<th style={{ width: '20%' }}>Tanggal Donor</th>
							<th style={{ width: '10%' }}>Golongan Darah</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{pendonorData.map((pendonor, index) => (
							<tr key={index + page * limit}>
								<td>{index + 1 + page * limit}</td>
								<td>{pendonor.User.nama}</td>
								<td>{pendonor.User.jenis_kelamin}</td>
								<td>{pendonor.User.kecamatan}</td>
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
