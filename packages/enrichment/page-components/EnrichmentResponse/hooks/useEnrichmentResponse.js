import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useEnrichmentResponse = ({ activeTab = 'user' }) => {
	const router = useRouter();

	const { query = {} } = router;

	const { action_type:actionType = '', id:feedback_request_id } = query;

	const [params, setParams] = useState({
		sort_type : 'asc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			feedback_request_id,
			response_type: 'user',
		},
		is_third_party: true,
	});

	const [{ loading = false, data = [] }, refetch] = useAllocationRequest({
		url     : '/feedback_responses',
		method  : 'get',
		authkey : 'get_allocation_feedback_responses',
		params,
	}, { manual: false });

	const { list = [] } = data || {};

	useEffect(() => {
		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				response_type: activeTab === 'address' ? ['address', 'billing_address'] : activeTab,
			},
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return {
		data             : list,
		refetchResponses : refetch,
		loadingResponses : loading,
		setParams,
		actionType,
	};
};

export default useEnrichmentResponse;
