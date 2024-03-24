import axios from 'axios';

const cariSukarelawan = async data => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(
			'http://127.0.0.1:3000/v1/user/volunteer/search',
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
