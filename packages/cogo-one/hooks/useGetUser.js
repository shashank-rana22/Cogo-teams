import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetUser = ({ userId, leadUserId }) => {
	const apiName =	!isEmpty(userId) ? 'get_user' : 'get_lead_user';

	const [{ loading, data }, trigger] = useRequest({
		url    : `${apiName}`,
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		await trigger({
			params: {
				id: !isEmpty(userId) ? userId : leadUserId,
			},
		});
	};
	useEffect(() => {
		if (userId || leadUserId) {
			fetchUser();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, leadUserId]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
