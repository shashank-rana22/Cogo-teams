import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useAllocationConfigurations = () => {
	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status: ['active', 'draft', 'publishable', 'checking', 'not_publishable'],
		},
	});

	const [{ loading, data }, refetch] = useRequest({
		url    : '/list_allocation_configurations',
		method : 'get',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		refetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		paginationData,
		getNextPage,
		params,
		setParams,
	};
};

export default useAllocationConfigurations;
