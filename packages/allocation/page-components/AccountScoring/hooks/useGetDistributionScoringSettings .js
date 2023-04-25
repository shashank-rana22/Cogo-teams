import { useAllocationRequest } from '@cogoport/request';

function useGetDistributionScoringSettings() {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_distribution_settings',
		method  : 'GET',
		authkey : 'get_allocation_engagement_distribution_settings',
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		distributionLoading : loading,
		distributionRefetch : refetch,
		distributionList    : list,
	};
}

export default useGetDistributionScoringSettings;
