import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetAccountDistributionGraph() {
	const [params, setParams] = useState({});

	const [{ loading, data }] = useAllocationRequest({
		url     : 'engagement_scoring_account_distribution_graph',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_account_distribution_graph',
		params,
	}, { manual: false });

	return {
		graphData      : data,
		graphLoading   : loading,
		setGraphParams : setParams,
	};
}

export default useGetAccountDistributionGraph;
