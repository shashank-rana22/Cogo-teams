import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetUserStats = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_subscription_user_stats',
	}, { manual: true });

	// getting cancel error by removing async await
	const refetchUserStats = useCallback(async (searchTerm) => {
		try {
			await trigger({
				params: {
					q: searchTerm,
				},
			});
		} catch (err) {
			if (err.code !== 'ERR_CANCELED') Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		refetchUserStats();
	}, [refetchUserStats]);

	return {
		refetchUserStats, userStatsData: data, statsLoading: loading,
	};
};

export default useGetUserStats;
