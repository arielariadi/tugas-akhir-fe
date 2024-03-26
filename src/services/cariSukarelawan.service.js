import axios from 'axios';
import config from './config-api/config';

const cariSukarelawan = async data => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(
			`${config.API_URL}/v1/user/volunteer/search`,
			{
				headers: {
					Authorization: `${userToken}`,
				},
				params: {
					...data,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export default cariSukarelawan;
