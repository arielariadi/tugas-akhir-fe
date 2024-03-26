import axios from 'axios';
import config from '../config-api/config';

const getBankDarahService = async () => {
	const adminToken = localStorage.getItem('adminToken');
	try {
		const response = await axios.get(`${config.API_URL}/v1/admin/bankDarah`, {
			headers: {
				Authorization: adminToken,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default getBankDarahService;
