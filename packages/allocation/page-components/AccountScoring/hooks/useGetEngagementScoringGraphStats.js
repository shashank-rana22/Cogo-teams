import { useAllocationRequest } from '@cogoport/request';

const useGetEngagementScoringGraphStats = (props) => {
	const { scoreTrendIds } = props;

	const [{ data }] = useAllocationRequest({
		url     : 'engagement_scoring_score_graph',
		method  : 'GET',
		authkey : 'get_allocation_engagement_scoring_score_graph',
		params  : scoreTrendIds,
	}, { manual: false });

	return {
		data,
	};
};

export default useGetEngagementScoringGraphStats;
