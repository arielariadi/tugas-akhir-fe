import axios from 'axios';
import config from './config-api/config';

const daftarDonor = async data => {
	const userToken = localStorage.getItem('userToken');

	try {
		const response = await axios.post(
			`${config.API_URL}/v1/user/jadwal/daftar`,
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
