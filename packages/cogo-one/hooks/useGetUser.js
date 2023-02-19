import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetUser = ({ leadUserId, userId, customerId }) => {
	const apiName =	 userId ? 'get_user' : 'get_lead_user';

	const [{ loading, data }, trigger] = useRequest({
		url    : `${apiName}`,
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		await trigger({
			params: {
				id: userId || leadUserId,
			},
		});
	};
	useEffect(() => {
		if (userId || leadUserId) {
			fetchUser();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leadUserId, userId, customerId]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
