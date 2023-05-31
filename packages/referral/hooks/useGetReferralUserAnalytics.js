import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetReferralUserAnalytics = ({ filterType = '', selectedDate = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_referral_user_analytics',
	}, { manual: true });

	const { endDate, startDate } = selectedDate || {};
	const userAnalyticStats = useCallback(() => {
		try {
			trigger({
				params: {
					start_date : startDate || undefined,
					end_date   : endDate || undefined,
					type       : filterType,
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [trigger, startDate, endDate, filterType]);

	useEffect(() => {
		userAnalyticStats();
	}, [userAnalyticStats]);

	return { data, loading };
};

export default useGetReferralUserAnalytics;
