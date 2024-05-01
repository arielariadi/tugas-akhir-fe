import axios from 'axios';
import config from '../config-api/config';

const acceptedBloodDonorRegistrationService = async data => {
	const adminToken = localStorage.getItem('adminToken');

	try {
		const response = await axios.post(
			`${config.API_URL}/v1/admin/pendonorDarah/accept`,
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

export default acceptedBloodDonorRegistrationService;
