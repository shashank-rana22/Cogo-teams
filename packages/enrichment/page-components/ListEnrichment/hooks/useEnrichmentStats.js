import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useEnrichmentStats = () => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const { authParams, selected_agent_id } = profile || {};

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/feedback_request_stats',
		method  : 'get',
		authkey : 'get_allocation_feedback_request_stats',
		params  : {
			filters: {
				partner_id : profile.partner?.id,
				user_id    : selected_agent_id || undefined,
			},
		},
	}, { manual: false });

	useEffect(() => {
		refetch();
	}, [authParams, refetch, selected_agent_id]);

	return {
		loading,
		stats: data,
		refetch,
	};
};

export default useEnrichmentStats;
