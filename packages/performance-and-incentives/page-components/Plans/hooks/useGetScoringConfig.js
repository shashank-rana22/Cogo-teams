import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetScoringConfig = () => {
	const { query } = useRouter();

	const { id } = query;

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : 'config',
		method  : 'GET',
		authkey : 'get_agent_scoring_config',
	}, { manual: true });

	const getAgentScoringConfig = useCallback(async () => {
		try {
			await trigger({
				params: {
					id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	}, [trigger, id]);

	useEffect(() => {
		if (id) {
			getAgentScoringConfig();
		}
	}, [getAgentScoringConfig, id]);

	return {
		data,
		loading,
	};
};

export default useGetScoringConfig;
