import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useBadgeConfigurationList() {
	const [params, setParams] = useState({
		page: 1,
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/allocation/kam_expertise_badge_configuration_list',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_badge_configuration_list',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams(() => ({
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		paginationData,
		getNextPage,
		listRefetch: refetch,
	};
}

export default useBadgeConfigurationList;
