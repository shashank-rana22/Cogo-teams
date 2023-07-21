import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetListObjectives = () => {
	const [toggleValue, setToggleValue] = useState('active');

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
		filters    : {
			excluding_status: 'inactive',
		},
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

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				excluding_status: toggleValue === 'active'
					? 'inactive' : ['live', 'verified', 'verification_pending', 'rejected'],
			},
		}));
	}, [toggleValue]);

	return {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		toggleValue,
		setToggleValue,
	};
};

export default useGetListObjectives;
