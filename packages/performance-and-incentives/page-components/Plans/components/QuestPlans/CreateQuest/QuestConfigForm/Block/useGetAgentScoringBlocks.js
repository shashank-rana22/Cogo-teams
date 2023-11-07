import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetAgentScoringBlocks = (props) => {
	const { watchBlock = '', config_id = null } = props;

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : 'blocks',
		method  : 'GET',
		authkey : 'get_agent_scoring_blocks',
	}, { manual: true });

	const getAgentScoringBlocks = useCallback(async () => {
		try {
			await trigger({
				params: {
					agent_scoring_parameters_data_required : true,
					filters                                : {
						q                       : watchBlock,
						agent_scoring_config_id : config_id || undefined,
					},
					page_limit: 1000,
				},
			});
		} catch (error) {
			if (error.message !== 'canceled') {
				Toast.error(getApiErrorString(error.response?.data) || 'Something went wrong');
			}
		}
	}, [watchBlock, trigger, config_id]);

	useEffect(() => {
		if (watchBlock) {
			getAgentScoringBlocks();
		}
	}, [getAgentScoringBlocks, watchBlock]);

	const { list = [] } = data || {};

	return {
		list,
		blockParameterLoading: loading,
	};
};

export default useGetAgentScoringBlocks;
