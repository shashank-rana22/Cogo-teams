import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetObjectiveAgentsMapping = () => {
	const [params, setParams] = useState({
		page     : 1,
		role_ids : [],
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/objective_user_mappings',
		method  : 'GET',
		authkey : 'get_allocation_objective_user_mappings',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (nextPage = '') => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	return {
		list,
		loading,
		paginationData,
		getNextPage,
		setParams,
	};
};

export default useGetObjectiveAgentsMapping;
