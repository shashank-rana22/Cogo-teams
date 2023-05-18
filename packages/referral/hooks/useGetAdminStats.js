import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetAdminStats = ({ date = {} }) => {
	const { endDate = null, startDate = null } = date || {};

	const [{ data: statsData, loading: statsLoading }, trigger] = useRequest({
		url    : '/get_referral_admin_stats',
		method : 'get',
	}, { manual: true });

	const getReferralStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						start_date : startDate || undefined,
						end_date   : endDate || undefined,
					},

				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [endDate, startDate, trigger]);

	useEffect(() => {
		getReferralStats();
	}, [getReferralStats]);

	return {
		statsData,
		statsLoading,
	};
};

export default useGetAdminStats;
