import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParam = ({ startDate, endDate, filterType }) => ({
	start_date : startDate || undefined,
	end_date   : endDate || undefined,
	type       : filterType,
});

const useGetReferralUserAnalytics = ({ filterType = '', selectedDate = {} }) => {
	const { endDate, startDate } = selectedDate || {};

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_referral_user_analytics',
	}, { manual: true });

	const userAnalyticStats = useCallback(() => {
		try {
			trigger({
				params: getParam({ startDate, endDate, filterType }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, startDate, endDate, filterType]);

	useEffect(() => {
		userAnalyticStats();
	}, [userAnalyticStats]);

	return { data, loading };
};

export default useGetReferralUserAnalytics;
