import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useEnrichmentStats = () => {
	const {
		profile = {},
	} = useSelector((state) => state);

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/feedback_request_stats',
		method  : 'get',
		authkey : 'get_allocation_feedback_request_stats',
		params  : {
			user_id    : profile.user?.id,
			partner_id : profile.partner?.id,
		},
	}, { manual: false });

	return {
		loading,
		stats: data,
		refetch,
	};
};

export default useEnrichmentStats;
