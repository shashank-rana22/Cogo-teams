import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useListAllocationConfigurations = () => {
	const [showCreateConfig, setShowCreateConfig] = useState(false);

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status: ['active', 'draft', 'publishable', 'checking', 'not_publishable'],
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : '/configurations',
		method  : 'get',
		authkey : 'get_allocation_configurations',
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
		paginationData,
		getNextPage,
		params,
		setParams,
		showCreateConfig,
		setShowCreateConfig,
		listRefetch: refetch,
	};
};

export default useListAllocationConfigurations;
