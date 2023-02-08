import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useListAllocationInstances = ({ item = {} }) => {
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		page       : 1,
		page_limit : 5,
		filters    : {
			allocation_id: item.allocation_schedule?.id,
		},
	});

	const [{ data, loading }] = useRequest({
		url    : '/list_allocation_instances',
		method : 'get',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		listLoading: loading,
		list,
		paginationData,
		getNextPage,
	};
};

export default useListAllocationInstances;
