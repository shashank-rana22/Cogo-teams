import { useAllocationRequest } from '@cogoport/request';

function useGetLeaderboardView() {
	const [{ data, loading }] = useAllocationRequest({
		url     : '/view',
		method  : 'GET',
		authkey : 'get_agent_scoring_view',
	}, { manual: false });

	return {
		loading,
		viewData: data,

	};
}

export default useGetLeaderboardView;
