import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import getBankDarahService from '../../services/admin/getBankDarah.service';
import updateBankDarahService from '../../services/admin/updateBankDarah.service';
import '../../styles/admin/bank-darah.css';

const BankDarah = () => {
	const [bankDarah, setBankDarah] = useState([]);

	useEffect(() => {
		const getBankDarah = async () => {
			try {
				const response = await getBankDarahService();
				const sortedBankDarah = response.stok_bank_darah.sort((a, b) => {
					// Urutkan berdasarkan nama golongan darah
					return a.gol_darah.localeCompare(b.gol_darah);
				});
				setBankDarah(sortedBankDarah);
			} catch (error) {
				console.log(error);
			}
		};
		getBankDarah();
	}, []);

	const handleInputChange = (id_gol_darah, value) => {
		setBankDarah(prevBankDarah => {
			return prevBankDarah.map(bank => {
				if (bank.id_gol_darah === id_gol_darah) {
					return { ...bank, jumlah_kantong_darah: parseInt(value) };
				}
				return bank;
			});
		});
	};

	const handleSubmit = async () => {
		try {
			await Promise.all(
				bankDarah.map(async bank => {
					await updateBankDarahService({
						id_gol_darah: bank.id_gol_darah,
						jumlah_kantong_darah: bank.jumlah_kantong_darah,
					});
				})
			);
			alert('Stok darah berhasil diperbarui!');
		} catch (error) {
			alert('Terjadi kesalahan saat memperbarui stok darah.');
			console.error(error);
		}
	};

	return (
		<div className="bank-darah-wrapper">
			<h1>Bank Darah</h1>
			<Row>
				<Col>
					{bankDarah
						.slice(0, Math.ceil(bankDarah.length / 2))
						.map((bank, index) => (
							<Form key={index}>
								<Form.Group className="mb-3">
									<Form.Label>{bank.gol_darah}</Form.Label>
									<Form.Control
										type="number"
										defaultValue={bank.jumlah_kantong_darah}
										onChange={e =>
											handleInputChange(bank.id_gol_darah, e.target.value)
										}
										id={bank.id_gol_darah}
									/>
								</Form.Group>
							</Form>
						))}
				</Col>
				<Col>
					{bankDarah
						.slice(Math.ceil(bankDarah.length / 2))
						.map((bank, index) => (
							<Form key={index}>
								<Form.Group className="mb-3">
									<Form.Label>{bank.gol_darah}</Form.Label>
									<Form.Control
										type="number"
										defaultValue={bank.jumlah_kantong_darah}
										onChange={e =>
											handleInputChange(bank.id_gol_darah, e.target.value)
										}
										id={bank.id_gol_darah}
									/>
								</Form.Group>
							</Form>
						))}
				</Col>
			</Row>
			<div className="button-wrapper">
				<Button type="submit" onClick={handleSubmit}>
					Simpan
				</Button>
			</div>
		</div>
	);
};

export default BankDarah;
