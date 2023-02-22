import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetUser = ({ id, userId, customerId }) => {
	const { leade_user_id } = id || {};
	const apiName =	 leade_user_id ? 'get_lead_user' : 'get_user';

	const [{ loading, data }, trigger] = useRequest({
		url    : `${apiName}`,
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		await trigger({
			params: {
				id: leade_user_id,
			},
		});
	};
	useEffect(() => {
		if (userId || leade_user_id) {
			fetchUser();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leade_user_id, userId, customerId]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
