import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetAdminStats = () => {
	const [{ data: statsData, loading: statsLoading }, trigger] = useRequest({
		url    : '/get_referral_admin_stats',
		method : 'get',
	}, { manual: true });

	const getReferralStats = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		getReferralStats();
	}, [getReferralStats]);

	return {
		statsData,
		statsLoading,
	};
};

export default useGetAdminStats;
