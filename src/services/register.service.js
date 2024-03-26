import axios from 'axios';
import config from './config-api/config';

const register = async data => {
	try {
		const response = await axios.post(
			`${config.API_URL}/v1/auth/register`,
			data
		);
		return response.data; // Mengembalikan respons dari panggilan API
	} catch (error) {
		throw new Error(error.response.data.message); // Melempar kesalahan yang diterima dari panggilan API
	}
};

export { register };
