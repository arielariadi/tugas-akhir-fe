import axios from 'axios';

const profileUser = async () => {
	const userToken = localStorage.getItem('userToken');
	try {
		const response = await axios.get(
			'http://127.0.0.1:3000/v1/user/userProfile',
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

export default profileUser;
