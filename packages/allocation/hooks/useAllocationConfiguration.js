import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useAllocationConfigurations = () => {
	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status: ['active', 'draft', 'publishable', 'checking', 'not_publishable'],
		},
	});

	const apiData = useRequest({
		url    : '/list_allocation_configurations',
		method : 'get',
		params,
	}, { manual: false });

	const [{ loading, data }] = apiData;

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

	};
};

export default useAllocationConfigurations;
