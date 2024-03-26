import axios from 'axios';
import config from './config-api/config';

const updateProfileUser = async data => {
	const userToken = localStorage.getItem('userToken');

	try {
		const response = await axios.put(
			`${config.API_URL}/v1/user/userProfile/update`,
			data,
			{
				headers: {
					Authorization: userToken,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default updateProfileUser;
