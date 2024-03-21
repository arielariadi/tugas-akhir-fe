import { useState, useEffect } from 'react';

const useLogin = () => {
	const [token, setToken] = useState(null);

	useEffect(() => {
		const userToken = localStorage.getItem('userToken');
		const adminToken = localStorage.getItem('adminToken');

		if (userToken) {
			setToken(userToken);
		} else if (adminToken) {
			setToken(adminToken);
		} else {
			window.location.href = '/login';
		}
	}, []);

	return token;
};

export default useLogin;
