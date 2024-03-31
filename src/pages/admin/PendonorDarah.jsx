/* eslint-disable no-unused-vars */
import { Table } from 'react-bootstrap';
// import pendonorDarahService from '../../services/admin/pendonorDarah.service';

import '../../styles/admin/pendonor-darah.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../services/config-api/config';

import ReactPaginate from 'react-paginate';

const PendonorDarah = () => {
	const [pendonorData, setPendonorData] = useState([]);

	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [msg, setMsg] = useState('');

	useEffect(() => {
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

	return (
		<div className="pendonor-darah-wrapper">
			<h1>Pendonor Darah</h1>

			<div className="table-wrapper">
				<Table striped>
					<thead>
						<tr>
							<th>No</th>
							<th>Nama</th>
							<th>Jenis Kelamin</th>
							<th>Alamat</th>
							<th>No Hp</th>
							<th>Tanggal Donor</th>
							<th>Golongan Darah</th>
						</tr>
					</thead>
					<tbody>
						{pendonorData.map((pendonor, index) => (
							<tr key={index + page * limit}>
								<td>{index + 1 + page * limit}</td>
								<td>{pendonor.User.nama}</td>
								<td>{pendonor.User.jenis_kelamin}</td>
								<td>{pendonor.User.alamat}</td>
								<td>{pendonor.User.no_hp}</td>
								<td>{formatData(pendonor.tgl_donor)}</td>
								<td>{pendonor.GolDarah.gol_darah}</td>
							</tr>
						))}
					</tbody>
				</Table>

				<div className="pagination-wrapper-get-pendonors">
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
		</div>
	);
};

export default PendonorDarah;
