import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParam = ({ startDate, endDate, activityType, rewardType, type }) => ({
	start_date    : startDate || undefined,
	end_date      : endDate || undefined,
	business_type : activityType !== 'total' ? activityType : undefined,
	reward_type   : rewardType !== 'total' ? rewardType : undefined,
	required_data : type,

});

const useGetReferralBusinessAnalytics = ({ selectedDate = {}, businessFilterType = {}, type }) => {
	const { endDate, startDate } = selectedDate || {};

	const { activityType = '', rewardType = '' } = businessFilterType;

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_referral_business_analytics',
	}, { manual: true });

	const userAnalyticStats = useCallback(() => {
		try {
			trigger({
				params: getParam({ startDate, endDate, activityType, rewardType, type }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, startDate, endDate, activityType, rewardType, type]);

	useEffect(() => {
		userAnalyticStats();
	}, [userAnalyticStats]);

	return { data, loading };
};

export default useGetReferralBusinessAnalytics;
