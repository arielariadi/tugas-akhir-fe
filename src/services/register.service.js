import axios from 'axios';

const register = async data => {
	try {
		const response = await axios.post(
			'http://127.0.0.1:3000/v1/auth/register',
			data
		);
		return response.data; // Mengembalikan respons dari panggilan API
	} catch (error) {
		throw new Error(error.response.data.message); // Melempar kesalahan yang diterima dari panggilan API
	}
};

export { register };
