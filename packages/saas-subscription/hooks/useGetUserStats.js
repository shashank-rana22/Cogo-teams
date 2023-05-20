import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetUserStats = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_subscription_user_stats',
	}, { manual: true });

	const refetchUserStats = (searchTerm) => {
		try {
			trigger({
				params: {
					q: searchTerm,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => { refetchUserStats(); }, []);

	return {
		refetchUserStats, userStatsData: data, statsLoading: loading
		,
	};
};

export default useGetUserStats;
