// import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
// import { isEmpty } from '@cogoport/utils';
// import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetUser = ({ activeMessageCard, activeTab, activeVoiceCard }) => {
	const { user_id: userId } = activeVoiceCard || {};

	const { user_id } = getActiveCardDetails(activeMessageCard);

	const USER_ID = userId || user_id;

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_user',
		method : 'get',
	}, { manual: true });

	const fetchUser = async () => {
		let id;
		if (activeTab === 'voice') {
			id = USER_ID;
		} else {
			id = USER_ID;
		}
		await trigger({
			params: {
				id,
			},
		});
	};
	useEffect(() => {
		if (USER_ID) {
			fetchUser();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard, activeTab]);

	return {
		loading,
		userData: data?.data,
	};
};
export default useGetUser;
