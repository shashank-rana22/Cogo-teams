import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPreferences = ({ DEFAULT_PARAMS = {} }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_user_alert_preference',
		method : 'GET',
		params : {
			...DEFAULT_PARAMS,
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

	const { user_id } = DEFAULT_PARAMS;

	useEffect(() => {
		if (user_id) {
			getPreferences();
		}
	}, [user_id, getPreferences]);
	return {
		preferences: data?.preferences || {},
		loading,
		getPreferences,
	};
};

export default useGetPreferences;
