// import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
// import { isEmpty } from '@cogoport/utils';
// import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

// import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetUser = ({ userId }) => {
	// const { user_id: userId } = activeVoiceCard || {};

	// const { user_id } = getActiveCardDetails(activeMessageCard);

	// const USER_ID = userId || user_id;

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user',
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		// let id;
		// if (activeTab === 'voice') {
		// 	id = userId;
		// } else {
		// 	id = userId;
		// }
		await trigger({
			params: {
				id: userId,
			},
		});
	};
	useEffect(() => {
		if (userId) {
			fetchUser();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
