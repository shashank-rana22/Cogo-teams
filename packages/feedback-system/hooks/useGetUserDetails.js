import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetUserDetails = ({ userId = '' }) => {
	const [{ loading = false, data : userData = {} }, trigger] = useRequest({
		url    : 'get_user',
		method : 'get',
	}, { manual: true });

	const getUserDetails = async () => {
		await trigger({ params: { UserID: userId } });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getUserDetails, []);

	return {
		loading,
		userData,
	};
};

export default useGetUserDetails;
