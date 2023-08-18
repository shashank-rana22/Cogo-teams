import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useEnrichmentStats = () => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const { authParams, selected_agent_id } = profile || {};

	const [{ loading, data }, trigger] = useAllocationRequest({
		url     : '/feedback_request_stats',
		method  : 'get',
		authkey : 'get_allocation_feedback_request_stats',
	}, { manual: false });

	const refetchStats = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						user_id: selected_agent_id || undefined,
					},
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [selected_agent_id, trigger]);

	useEffect(() => {
		refetchStats();
	}, [authParams, refetchStats, selected_agent_id]);

	return {
		loading,
		stats: data,
		refetchStats,
	};
};

export default useEnrichmentStats;
