import axios from 'axios';
import config from './config-api/config';

const getJadwalDonor = async () => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(`${config.API_URL}/v1/user/jadwal/`, {
			headers: {
				Authorization: `${userToken}`,
			},
		});

		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default getJadwalDonor;
