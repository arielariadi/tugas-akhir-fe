import axios from 'axios';
import config from '../config-api/config';

const acceptValidationBloodDonorService = async data => {
	const adminToken = localStorage.getItem('adminToken');

	try {
		const response = await axios.post(
			`${config.API_URL}/v1/admin/showAcceptedCalonPendonorDarah/acceptValidation`,
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

export default acceptValidationBloodDonorService;
