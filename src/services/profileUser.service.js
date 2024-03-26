import axios from 'axios';
import config from './config-api/config';

const profileUser = async () => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(`${config.API_URL}/v1/user/userProfile`, {
			headers: {
				Authorization: `${userToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default profileUser;
