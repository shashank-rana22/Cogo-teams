import { useAllocationRequest } from '@cogoport/request';

function useGetAgentScoringReportStats() {
	const [{ data, loading }] = useAllocationRequest({
		url     : '/report_stats',
		method  : 'GET',
		authkey : 'get_agent_scoring_report_stats',
	}, { manual: false });

	return {
		data,
		loading,
	};
}

export default useGetAgentScoringReportStats;
