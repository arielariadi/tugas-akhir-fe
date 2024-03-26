import axios from 'axios';
import config from '../config-api/config';

const updateBankDarahService = async data => {
	const adminToken = localStorage.getItem('adminToken');
	try {
		const response = await axios.put(
			`${config.API_URL}/v1/admin/bankDarah/update`,
			data,
			{
				headers: {
					Authorization: adminToken,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default updateBankDarahService;
