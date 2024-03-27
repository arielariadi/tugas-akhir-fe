import { Table } from 'react-bootstrap';
import pendonorDarahService from '../../services/admin/pendonorDarah.service';

import '../../styles/admin/pendonor-darah.css';
import { useState } from 'react';
import { useEffect } from 'react';

const PendonorDarah = () => {
	const [pendonorData, setPendonorData] = useState([]);

	useEffect(() => {
		const getPendonorData = async () => {
			try {
				const response = await pendonorDarahService();
				setPendonorData(response.pendonor);
				console.log('Berhasil menampilkan data pendonor', response);
			} catch (error) {
				console.log('Gagal menampilkan data pendonor', error);
			}
		};
		getPendonorData();
	}, []);

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
							<tr key={index}>
								<td>{index + 1}</td>
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
			</div>
		</div>
	);
};

export default PendonorDarah;
