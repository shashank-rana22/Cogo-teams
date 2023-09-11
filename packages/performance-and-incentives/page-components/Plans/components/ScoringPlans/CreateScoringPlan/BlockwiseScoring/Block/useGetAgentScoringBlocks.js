import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetAgentScoringBlocks = ({ blockValue = '' }) => {
	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : 'blocks',
		method  : 'GET',
		authkey : 'get_agent_scoring_blocks',
	}, { manual: true });

	const getAgentScoringBlocks = useCallback(async () => {
		try {
			await trigger({
				data: {
					display_name: blockValue,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	}, [blockValue, trigger]);

	useEffect(() => {
		getAgentScoringBlocks();
	}, [getAgentScoringBlocks]);

	return {
		data,
		getAgentScoringBlocks,
		loading,
	};
};

export default useGetAgentScoringBlocks;
