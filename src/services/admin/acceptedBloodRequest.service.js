import axios from 'axios';
import config from '../config-api/config';

const acceptedBloodRequestService = async data => {
	const adminToken = localStorage.getItem('adminToken');

	try {
		const response = await axios.post(
			`${config.API_URL}/v1/admin/requestDarah/accept`,
			data,
			{
				headers: {
					Authorization: adminToken,
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default acceptedBloodRequestService;
