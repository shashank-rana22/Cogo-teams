import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPreferences = ({ companyId, userId }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_user_alert_preference',
		method : 'GET',
		params : {
			organization_id : companyId,
			user_id         : userId,
		},
	}, { manual: true });

	const getPreferences = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		if (userId) {
			getPreferences();
		}
	}, [userId, getPreferences]);
	return {
		preferences: data?.preferences || {},
		loading,
		getPreferences,
	};
};

export default useGetPreferences;
