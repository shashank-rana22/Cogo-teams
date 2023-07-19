import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

const useHeaderStats = () => {
	const router = useRouter();

	const { query = {} } = router;

	const [{ loading, data }] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params  : {
			filters: {
				id: query.id,
			},
			is_third_party: true,

		},
	}, { manual: false });

	const { list = [] } = data || {};

	return {
		data: list[ZEROTH_INDEX],
		loading,
	};
};

export default useHeaderStats;
