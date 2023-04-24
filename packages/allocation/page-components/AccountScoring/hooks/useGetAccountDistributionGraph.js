import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetAccountDistributionGraph(watch) {
	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : 'engagement_scoring_account_distribution_graph',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_account_distribution_graph',
		// params  : {
		// 	filters: {
		// 			formValues?.organization,
		// 			formValues?.segment_id,
		// 			formValues?.kam,
		// 			formValues?.date
		// 	},
		// },
	}, { manual: false });

	const organization = watch('organization');
	const kam = watch('kam');
	const date = watch('date');
	const segment = watch('segment_id');

	useEffect(() => {
		refetch();
		console.log('organization', organization);
		console.log('date', date);
		console.log('kam', kam);
		console.log('segment', segment);
	}, [organization, refetch, kam, date, segment]);

	return {
		graphData    : data,
		graphLoading : loading,
	};
}

export default useGetAccountDistributionGraph;
