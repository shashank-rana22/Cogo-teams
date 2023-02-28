import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useEnrichmentRequests = () => {
	const router = useRouter();
	const { query = {} } = router;

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			id: query.id,
		},
		is_third_party: true,
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params,
	}, { manual: false });
	const { list = [], ...paginationData } = data || {};

	return {
		requestData: list[0],
		paginationData,
		refetch,
		loading,
		setParams,

	};
};

export default useEnrichmentRequests;
