import axios from 'axios';

const daftarDonor = async data => {
	const userToken = localStorage.getItem('userToken');

	try {
		const response = await axios.post(
			'http://127.0.0.1:3000/v1/user/jadwal/daftar',
			data,
			{
				headers: {
					Authorization: `${userToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default daftarDonor;
