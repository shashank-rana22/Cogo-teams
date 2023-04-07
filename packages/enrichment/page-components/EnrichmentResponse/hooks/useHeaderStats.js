import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

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
		requestData: list[0],
		loading,
	};
};

export default useHeaderStats;
