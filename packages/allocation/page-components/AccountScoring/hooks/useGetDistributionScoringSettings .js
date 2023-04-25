import { useAllocationRequest } from '@cogoport/request';

function useGetDistributionScoringSettings() {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_scoring_account_stats',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_account_stats',
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		distributionLoading : loading,
		distributionRefetch : refetch,
		distributionList    : list,
	};
}

export default useGetDistributionScoringSettings;
