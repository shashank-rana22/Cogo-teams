import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetQuest = ({ id }) => {
	const [{ loading, data }, trigger] = useAllocationRequest(
		{
			url     : '/quest',
			method  : 'get',
			authkey : 'get_agent_scoring_quest',
		},
		{ manual: true },
	);

	const getAgentScoringQuest = useCallback(async () => {
		try {
			await trigger({
				params: {
					id,
					configuration_data_required: true,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data) || 'Something went wrong');
		}
	}, [trigger, id]);

	useEffect(() => {
		if (id) {
			getAgentScoringQuest();
		}
	}, [getAgentScoringQuest, id]);

	return {
		loading,
		data,
	};
};

export default useGetQuest;
