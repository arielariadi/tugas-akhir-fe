import Axios from 'axios';
import config from './config-api/config';

const permintaanDarahService = async data => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await Axios.post(
			`${config.API_URL}/v1/user/requestDarah/request`,
			data,
			{
				headers: {
					Authorization: userToken,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default permintaanDarahService;
