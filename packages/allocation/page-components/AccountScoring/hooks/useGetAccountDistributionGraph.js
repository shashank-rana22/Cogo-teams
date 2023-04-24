import { useAllocationRequest } from '@cogoport/request';

function useGetAccountDistributionGraph() {
	const [{ loading, data }] = useAllocationRequest({
		url     : 'engagement_scoring_account_distribution_graph',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_account_distribution_graph',
	}, { manual: false });

	return {
		graphData    : data,
		graphLoading : loading,
	};
}

export default useGetAccountDistributionGraph;
