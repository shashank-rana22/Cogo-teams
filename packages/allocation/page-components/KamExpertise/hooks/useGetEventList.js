import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetEventList() {
	const [searchValue, setSearchValue] = useState();
	const [expertise, setExpertise] = useState();
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	console.log('hook call expertise::', expertise);

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status         : 'draft',
			condition_name : searchQuery || undefined,
			expertise_type : expertise || undefined,
		},
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_event_configuration_attributes',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_event_configuration_attributes',
		params,
	}, { manual: false });

	// console.log('EVENTGET DATA::', data);

	// console.log('loading :::', loading);

	useEffect(() => {
		console.log('expertise::', expertise);
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				condition_name : searchQuery || undefined,
				expertise_type : expertise || undefined,
			},
		}));
	}, [searchQuery, expertise]);

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
		debounceQuery,
		searchValue,
		setSearchValue,
		setExpertise,
		expertise,
	};
}

export default useGetEventList;
