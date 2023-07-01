import { useAllocationRequest } from '@cogoport/request';

function useGetEngagementScoringSettings() {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_scoring_settings',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_settings',
	}, { manual: false });

	const { list = {} } = data || {};

	const { bias : biasList = [], percentile : percentileList = [] } = list;

	return {
		settingsLoading : loading,
		settingsRefetch : refetch,
		biasList,
		percentileList,
	};
}

export default useGetEngagementScoringSettings;
