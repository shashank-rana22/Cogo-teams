import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetUserStats = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_subscription_user_stats',
	}, { manual: true });

	const refetchUserStats = useCallback(async (searchTerm) => {
		try {
			await trigger({
				params: {
					q: searchTerm,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger]);

	useEffect(() => { refetchUserStats(); }, [refetchUserStats]);

	return {
		refetchUserStats, userStatsData: data, statsLoading: loading,
	};
};

export default useGetUserStats;
