import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useEnrichmentData = () => {
	const router = useRouter();
	const { query = {} } = router;

	const [activeTab, setActiveTab] = useState('user');

	const [responseData, setResponseData] = useState([]);
	const [showAddPoc, setShowAddPoc] = useState(false);

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			feedback_request_id: query.id,

		},
		is_third_party: true,
	});

	const [{ loading = false, data = [] }, refetch] = useAllocationRequest({
		url     : '/feedback_responses',
		method  : 'get',
		authkey : 'get_allocation_feedback_responses',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	useEffect(() => {
		setResponseData([...list]);
	}, [list]);

	useEffect(() => {
		setShowAddPoc(false);
	}, [activeTab]);

	return {
		list,
		paginationData,
		refetch,
		loading,
		setParams,
		activeTab,
		setActiveTab,
		setResponseData,
		responseData,
		showAddPoc,
		setShowAddPoc,

	};
};

export default useEnrichmentData;
