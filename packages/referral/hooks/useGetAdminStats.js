import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetAdminStats = ({ date = {}, userType = '' }) => {
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
						user_type  : userType || undefined,
						start_date : startDate || undefined,
						end_date   : endDate || undefined,
					},

				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [endDate, startDate, trigger, userType]);

	useEffect(() => {
		getReferralStats();
	}, [getReferralStats]);

	return {
		statsData,
		statsLoading,
	};
};

export default useGetAdminStats;
