import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useEnrichmentData = () => {
	const [activeTab, setActiveTab] = useState('user');

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {},
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/feedback_requests',
		method  : 'get',
		authkey : 'get_allocation_feedback_requests',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	return {
		list,
		paginationData,
		refetch,
		loading,
		setParams,
		activeTab,
		setActiveTab,

	};
};

export default useEnrichmentData;
