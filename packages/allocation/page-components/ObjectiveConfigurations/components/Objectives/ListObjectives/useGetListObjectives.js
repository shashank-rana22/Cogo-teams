import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetListObjectives = () => {
	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/objectives',
		method  : 'GET',
		authkey : 'get_allocation_objectives',
		params,
	}, { manual: false });

	const { list, ...paginationData } = data || {};

	const getNextPage = (nextPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	return {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
	};
};

export default useGetListObjectives;
