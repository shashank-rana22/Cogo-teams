import { useAllocationRequest } from '@cogoport/request';

const useGetScoringConfig = ({ config_id }) => {
	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : 'config',
		method  : 'GET',
		authkey : 'get_agent_scoring_config',
		params  : {
			id: config_id,
		},
	}, { manual: false });

	return {
		data,
		getConfigLoading: loading,
		refetch,
		config_id,
	};
};

export default useGetScoringConfig;
