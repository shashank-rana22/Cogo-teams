import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useListAllocationQuotas = () => {
	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status     : 'active',
			quota_type : 'role',
		},
	});

	const api = useRequest({
		url    : '/list_allocation_quotas',
		method : 'get',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = api;

	// const getNextPage = (newPage) => {
	// 	setParams((previousParams) => ({
	// 		...previousParams,
	// 		page: newPage,
	// 	}));
	// };

	return {
		data,
		loading,
		// getNextPage,
		params,
		setParams,
		refetch,
	};
};

export default useListAllocationQuotas;
