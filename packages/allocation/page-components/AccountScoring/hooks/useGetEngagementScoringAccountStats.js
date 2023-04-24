import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetEngagementScoringAccountStats() {
	const [params, setParams] = useState({});

	const [{ loading, data }] = useAllocationRequest({
		url     : 'engagement_scoring_account_stats',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_account_stats',
		params,
	}, { manual: false });

	console.log('data : ', data);

	return {
		loading,
		setParams,
		data,
	};
}

export default useGetEngagementScoringAccountStats;
