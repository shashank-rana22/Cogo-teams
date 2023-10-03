import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetScoringConfig = () => {
	const { query : { id : scoring_confing_id } = {} } = useRouter();

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : 'config',
		method  : 'GET',
		authkey : 'get_agent_scoring_config',
	}, { manual: true });

	const getAgentScoringConfig = useCallback(async () => {
		try {
			await trigger({
				params: {
					id: scoring_confing_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data) || 'Something went wrong');
		}
	}, [trigger, scoring_confing_id]);

	useEffect(() => {
		if (scoring_confing_id) {
			getAgentScoringConfig();
		}
	}, [getAgentScoringConfig, scoring_confing_id]);

	return {
		data,
		getConfigLoading : loading,
		refetch          : getAgentScoringConfig,
		scoring_confing_id,
	};
};

export default useGetScoringConfig;
