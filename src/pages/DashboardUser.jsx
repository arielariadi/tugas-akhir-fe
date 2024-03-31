/* eslint-disable no-unused-vars */
import { Button, Container, Table, Modal } from 'react-bootstrap';
import '../styles/user/dashboard-user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import config from '../services/config-api/config';

const DashboardUser = () => {
	const [donorData, setDonorData] = useState([]); // state untuk menyimpan data pendonor

	const [show, setShow] = useState(false);
	const [modalIndex, setModalIndex] = useState(null);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [msg, setMsg] = useState('');

	// Fungsi untuk menutup modal
	const handleClose = () => {
		setShow(false);
		setModalIndex(null); // Reset indeks modal saat modal ditutup
	};

	// Fungsi untuk membuka modal dan mengatur indeks modal yang dipilih
	const handleShow = index => {
		setShow(true);
		setModalIndex(index);
	};

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

	// Fungsi untuk mengubah halaman pagination
	const changePage = ({ selected }) => {
		setPage(selected);
		if (selected === 4) {
			setMsg(
				'Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!'
			);
		} else {
			setMsg('');
		}
	};

	return (
		<div className="dashboard-wrapper">
			<Container>
				<h1 className="text-center">Dashboard</h1>

				<div className="table-wrapper mt-4">
					<Table striped>
						<thead>
							<tr>
								<th>No</th>
								<th>Lokasi Donor Darah</th>
								<th>Tanggal Donor</th>
								<th>Golongan Darah</th>
								<th>Bukti Pendaftaran</th>
							</tr>
						</thead>
						<tbody>
							{donorData &&
								donorData.map((donor, index) => (
									<tr key={index + page * limit}>
										<td>{index + 1 + page * limit}</td>
										<td>{donor.lokasi_pmi}</td>
										<td>{donor.tanggal_donor}</td>
										<td>{donor.gol_darah}</td>
										<td>
											<Button
												className="button-bukti"
												onClick={() => handleShow(index)}>
												Bukti
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>

					<div className="pagination-wrapper">
						<p>
							Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
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
			</Container>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Data Calon Pendonor</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div>
						<p>Tolong perlihatkan data ini kepada petugas :</p>
						{modalIndex !== null && (
							<>
								<p>Nama Pendonor: {donorData[modalIndex].nama_user}</p>
								<p>Email: {donorData[modalIndex].email_user}</p>
							</>
						)}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default DashboardUser;
