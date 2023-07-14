import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useGetEngagementScoringAccountStats() {
	const [{ loading, data }, trigger] = useAllocationRequest({
		url     : 'engagement_scoring_account_stats',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_account_stats',
	}, { manual: true });

	const onUpdateStats = async (limits) => {
		try {
			await trigger({ params: { limits } });

			Toast.success('Update successfull!');
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	};

	const { list = [] } = data || {};

	return {
		statsLoading : loading,
		statsList    : list,
		onUpdateStats,
	};
}

export default useGetEngagementScoringAccountStats;
