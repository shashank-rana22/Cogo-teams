import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetBadgeList() {
	const [params, setParams] = useState({
		// sort_type : 'desc',
		// sort_by   : 'created_at',
		page: 1,
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/allocation/kam_expertise_badge_configuration_list',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_badge_configuration_list',
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
		loading,
		list,
		listRefetch: refetch,
		paginationData,
		getNextPage,
	};
}
export default useGetBadgeList;
