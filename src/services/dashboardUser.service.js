import axios from 'axios';

const getDashboardUser = async () => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(
			'http://127.0.0.1:3000/v1/user/dashboardUser/',
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
