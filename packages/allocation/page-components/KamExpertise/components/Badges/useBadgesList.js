// ToDo :- Delete this file
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useBadgesList = () => {
	const [params, setParams] = useState({
		sort_type  : 'desc',
		sort_by    : 'expiry_date',
		page_limit : 10,
		page       : 1,
		// filters    : {
		// 	status : 'active',
		// 	q      : searchQuery || undefined,
		// },
		// data_required: true,
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/relations',
		method  : 'get',
		authkey : 'get_allocation_relations',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	return ({
		list,
		paginationData,
		refetch,
		loading,
		setParams,
	});
};

export default useBadgesList;
