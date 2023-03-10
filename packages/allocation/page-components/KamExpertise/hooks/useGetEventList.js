import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetEventList() {
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'draft',
		},
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration_attributes',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_event_configuration_attributes',
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
		list,
		listRefetch: refetch,
		paginationData,
		loading,
		setParams,
		getNextPage,
	};
}

export default useGetEventList;
