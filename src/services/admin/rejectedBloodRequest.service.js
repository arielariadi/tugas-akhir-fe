import axios from 'axios';
import config from '../config-api/config';

const rejectedBloodRequestService = async data => {
	const adminToken = localStorage.getItem('adminToken');

	try {
		const response = await axios.post(
			`${config.API_URL}/v1/admin/requestDarah/reject`,
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

export default rejectedBloodRequestService;
