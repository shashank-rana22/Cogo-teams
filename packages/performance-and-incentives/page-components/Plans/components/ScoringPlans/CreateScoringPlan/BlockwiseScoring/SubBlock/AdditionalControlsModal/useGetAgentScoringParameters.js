import { useAllocationRequest } from '@cogoport/request';

const useGetAgentScoringParameters = ({ subBlockId = '' }) => {
	const [{ data = {}, loading }] = useAllocationRequest({
		url    : 'parameters',
		method : 'GET',
		params : {
			page_limit : 1000,
			filters    : {
				agent_scoring_block_id: subBlockId,
			},
		},
		authkey: 'get_agent_scoring_parameters',
	}, { manual: false });

	return {
		data,
		loading,
	};
};

export default useGetAgentScoringParameters;
