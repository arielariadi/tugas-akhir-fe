import { Button, Container, Table, Modal } from 'react-bootstrap';
import '../styles/user/dashboard-user.css';
import { useState } from 'react';
import { useEffect } from 'react';
import getDashboardUser from '../services/dashboardUser.service';

const DashboardUser = () => {
	const [donorData, setDonorData] = useState([]);
	const [show, setShow] = useState(false);
	const [modalIndex, setModalIndex] = useState(null);

	const handleClose = () => {
		setShow(false);
		setModalIndex(null); // Reset modalIndex saat modal ditutup
	};

	const handleShow = index => {
		setShow(true);
		setModalIndex(index);
	};

	useEffect(() => {
		const getDonorData = async () => {
			try {
				const response = await getDashboardUser();
				console.log(response);
				setDonorData(response[0].pendonor);
			} catch (error) {
				console.log(error);
			}
		};
		getDonorData();
	}, []);

	return (
		<div className="dashboard-wrapper">
			<Container>
				<h1 className="text-center">Dashboard</h1>

				<div className="mt-4">
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
							{donorData.map((donor, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{donor.lokasi_pmi}</td>
									<td>{donor.tanggal_donor}</td>
									<td>{donor.gol_darah}</td>
									<td>
										<Button onClick={() => handleShow(index)}>Bukti</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
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
