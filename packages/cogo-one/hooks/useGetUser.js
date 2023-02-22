import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetUser = ({ lead_user_id = null, userId = null, customerId }) => {
	const apiName =	 !userId ? 'get_lead_user' : 'get_user';

	const [{ loading, data }, trigger] = useRequest({
		url    : `${apiName}`,
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		await trigger({
			params: {
				id: lead_user_id,
			},
		});
	};
	useEffect(() => {
		if (userId || lead_user_id) {
			fetchUser();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lead_user_id, userId, customerId]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
