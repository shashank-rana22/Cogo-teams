import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useListAllocationPreferences = ({ item = {} }) => {
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 5,
		page       : 1,
		filters    : {
			status                      : 'active',
			allocation_configuration_id : item.id,
		},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/configuration_mutual_exclusions',
		method  : 'get',
		authkey : 'get_allocation_configuration_mutual_exclusions',
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

export default useListAllocationPreferences;
