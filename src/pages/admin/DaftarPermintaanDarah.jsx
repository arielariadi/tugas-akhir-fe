/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../services/config-api/config';

import { Table, Button, Modal } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';
import '../../styles/admin/daftar-permintaan-darah.css';

const DaftarPermintaanDarah = () => {
	const [permintaanDarahData, setPermintaanDarahData] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);

	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [msg, setMsg] = useState('');

	const [show, setShow] = useState(false);

	useEffect(() => {
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
		getPermintaanDarahData();
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

	const handleImageClick = imageUrl => {
		setSelectedImage(imageUrl);
		setShow(true);
	};

	const handleCloseImage = () => {
		setSelectedImage(null);
		setShow(false);
	};

	return (
		<div className="permintaan-darah-wrapper">
			<h1>Permintaan Darah</h1>

			<div className="table-wrapper" style={{ overflowX: 'auto' }}>
				<Table striped style={{ minWidth: '1000px' }}>
					<thead>
						<tr>
							<th style={{ width: '2%' }}>No</th>
							<th style={{ width: '15%' }}>Nama Pemohon</th>
							<th style={{ width: '15%' }}>Alamat</th>
							<th style={{ width: '10%' }}>Jenis Kelamin</th>
							<th style={{ width: '10%' }}>Golongan Darah</th>
							<th style={{ width: '5%' }}>Jumlah</th>
							<th style={{ width: '25%' }}>Deskripsi</th>
							<th style={{ width: '10%' }}>Tanggal Permintaan</th>
							<th style={{ width: '10%' }}>Surat Permohonan</th>
							<th style={{ width: '10%' }}>Aksi</th>
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
										{permintaanDarah.User.alamat}
									</td>
									<td>{permintaanDarah.User.jenis_kelamin}</td>
									<td>{permintaanDarah.GolDarah.gol_darah}</td>
									<td>{permintaanDarah.jumlah_darah}</td>
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

									<td colSpan="10" className="action-buttons">
										<Button variant="primary" className="accepted-button">
											Terima
										</Button>
										<Button variant="secondary" className="rejected-button">
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
					<Modal show={show} onHide={handleCloseImage} centered>
						<Modal.Header closeButton>
							<Modal.Title>Surat Permohonan</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<img src={selectedImage} alt="Selected Image" />
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
