import axios from 'axios';

const updateProfileUser = async data => {
	const userToken = localStorage.getItem('userToken');

	try {
		const response = await axios.put(
			'http://127.0.0.1:3000/v1/user/userProfile/update',
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
