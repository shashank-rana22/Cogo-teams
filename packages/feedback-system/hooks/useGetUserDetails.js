import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetUserDetails = ({ userId = '' }) => {
	const [{ loading = false, data : userData = {} }, trigger] = useRequest({
		url    : 'get_user_info',
		method : 'get',
	}, { manual: true });

	const getUserDetails = () => {
		trigger({ params: { UserID: userId } });
	};

	useEffect(() => {
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loading,
		userData,
	};
};

export default useGetUserDetails;
