import axios from 'axios';
import config from '../config-api/config';

const dashboardAdminService = async () => {
	const adminToken = localStorage.getItem('adminToken');
	try {
		const response = await axios.get(
			`${config.API_URL}/v1/admin/dashboardAdmin`,
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

export default dashboardAdminService;
