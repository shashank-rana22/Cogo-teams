import { useAllocationRequest } from '@cogoport/request';

const useGetAgentScoringParameters = ({ subBlockId = '' }) => {
	const [{ data, loading }] = useAllocationRequest({
		url    : 'parameters',
		method : 'GET',
		params : {
			id: subBlockId,
		},
		authkey: 'get_agent_scoring_parameters',
	}, { manual: false });

	return {
		data,
		loading,
	};
};

export default useGetAgentScoringParameters;
