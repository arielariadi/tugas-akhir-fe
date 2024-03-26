import axios from 'axios';
import config from './config-api/config';

const getDashboardUser = async () => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(
			`${config.API_URL}/v1/user/dashboardUser/`,
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

export default getDashboardUser;
