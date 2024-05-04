/* eslint-disable no-unused-vars */
import { Button, Container, Table, Modal, Badge } from 'react-bootstrap';
import '../styles/user/dashboard-user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import config from '../services/config-api/config';

const DashboardUser = () => {
	const [donorData, setDonorData] = useState([]); // state untuk menyimpan data pendonor
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);

	const [bloodRequestData, setBloodRequestData] = useState([]);
	const [page2, setPage2] = useState(0);
	const [limit2, setLimit2] = useState(5);
	const [pages2, setPages2] = useState(0);
	const [rows2, setRows2] = useState(0);
	const [selectedImage, setSelectedImage] = useState(null);
	const [show, setShow] = useState(false);

	const [msg, setMsg] = useState('');

	// Efek samping untuk memuat data pendonor saat komponen dimuat dan saat `page` atau `limit` berubah
	useEffect(() => {
		const getDonorData = async () => {
			try {
				const response = await axios.get(
					`${config.API_URL}/v1/user/dashboardUser/?page=${page}&limit=${limit}`,
					{
						headers: {
							Authorization: `${localStorage.getItem('userToken')}`,
						},
					}
				);
				const responseData = response.data;
				console.log('data', responseData.pendonor);
				setDonorData(responseData.pendonor);

				setPages(responseData.totalPage);
				setRows(responseData.totalRows);
			} catch (error) {
				console.log(error);
			}
		};
		getDonorData();
	}, [page, limit]);

	useEffect(() => {
		const getBloodRequestData = async () => {
			try {
				const response = await axios.get(
					`${config.API_URL}/v1/user/dashboardUser/requestDarah/?page=${page2}&limit=${limit2}`,
					{
						headers: {
							Authorization: `${localStorage.getItem('userToken')}`,
						},
					}
				);
				const responseData = response.data;
				console.log('data', responseData.request_darah);
				setBloodRequestData(responseData.request_darah);
				setPages2(responseData.totalPage);
				setRows2(responseData.totalRows);
			} catch (error) {
				console.log(error);
			}
		};
		getBloodRequestData();
	}, [page2, limit2]);

	// Fungsi untuk mengubah halaman pagination
	const changePage = ({ selected }) => {
		setPage(selected);
		if (selected === 4) {
			setMsg('Data tidak ditemukan');
		} else {
			setMsg('');
		}
	};

	const changePage2 = ({ selected }) => {
		setPage2(selected);
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

	const renderStatus = status => {
		let statusVariant = '';
		let statusText = '';
		let statusColor = '';

		switch (status) {
			case 0:
				statusVariant = 'danger';
				statusText = 'Ditolak';
				statusColor = 'white';
				break;
			case 1:
				statusVariant = 'warning';
				statusText = 'Pending';
				statusColor = 'black';
				break;
			case 2:
				statusVariant = 'success';
				statusText = 'Diterima';
				statusColor = 'white';
				break;
			default:
				statusVariant = 'secondary';
				statusText = 'Unknown';
				statusColor = 'white';
				break;
		}
		return (
			<Badge bg={statusVariant} text={statusColor}>
				{statusText}
			</Badge>
		);
	};

	const handleImageClick = imageUrl => {
		setSelectedImage(imageUrl);
		setShow(true);
	};

	const handleCloseImage = () => {
		setSelectedImage(null);
		setShow(false);
	};

	return (
		<div className="dashboard-wrapper">
			<Container>
				<h1 className="text-center">Dashboard</h1>

				<div className="table-wrapper mt-4">
					<h3>Pendaftaran Donor Darah</h3>
					<Table striped>
						<thead>
							<tr>
								<th>No</th>
								<th>Lokasi Donor Darah</th>
								<th>Tanggal Donor</th>
								<th>Golongan Darah</th>
								<th>Status</th>
								<th>Bukti Pendaftaran</th>
							</tr>
						</thead>
						<tbody>
							{donorData &&
								donorData.map((donor, index) => (
									<tr key={index + page * limit}>
										<td>{index + 1 + page * limit}</td>
										<td>{donor.lokasi_pmi}</td>
										<td>{formatData(donor.tanggal_donor)}</td>
										<td>{donor.gol_darah}</td>
										<td>{renderStatus(donor.status)}</td>
										<td>
											<Button className="button-bukti">Bukti</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>

					<div className="pagination-wrapper">
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

				<div className="table-wrapper-blood-request">
					<h3>Permintaan Darah</h3>
					<Table striped>
						<thead>
							<tr>
								<th>No</th>
								{/* <th>Nama Pemohon</th> */}
								<th>Golongan Darah</th>
								<th>Jumlah</th>
								<th>Deskripsi</th>
								<th>Tanggal Permintaan</th>
								<th>Status</th>
								<th>Bukti Penerimaan</th>
							</tr>
						</thead>
						<tbody>
							{bloodRequestData &&
								bloodRequestData.map((bloodRequest, index) => (
									<tr key={index + page * limit}>
										<td>{index + 1 + page * limit}</td>
										{/* <td>{bloodRequest.nama_user}</td> */}
										<td>{bloodRequest.gol_darah}</td>
										<td>{bloodRequest.jumlah_darah}</td>
										<td>{bloodRequest.deskripsi}</td>
										<td>{formatData(bloodRequest.tanggal_request_darah)}</td>
										<td>{renderStatus(bloodRequest.status)}</td>
										<td className="bukti-penerimaan">
											{bloodRequest.bukti_foto ? (
												<img
													src={
														`http://127.0.0.1:3000/bukti-foto/` +
														bloodRequest.bukti_foto
													}
													alt="Bukti Penerimaan"
													className="bukti-penerimaan"
													onClick={() =>
														handleImageClick(
															`http://127.0.0.1:3000/bukti-foto/` +
																bloodRequest.bukti_foto
														)
													}
												/>
											) : (
												<span>Belum ada bukti penerimaan</span>
											)}
										</td>
									</tr>
								))}
						</tbody>
					</Table>

					<div className="pagination-wrapper">
						<p>Jumlah data: {rows2}</p>
						<p>
							Halaman {rows2 ? page + 1 : 0} dari {pages2}
						</p>
						<ReactPaginate
							pageCount={pages2 || 0} // Menggunakan nilai pages atau 0 jika pages adalah falsy
							onPageChange={changePage2}
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
			</Container>

			{selectedImage && (
				<div className="modal-container">
					<Modal
						show={show}
						onHide={handleCloseImage}
						centered
						size="sm"
						className="modal">
						<Modal.Header closeButton>
							<Modal.Title>Bukti Penerimaan</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<img src={selectedImage} alt="Bukti Penerimaan" />
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseImage}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			)}
		</div>
	);
};

export default DashboardUser;
