import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetEventList() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};
	const [searchValue, setSearchValue] = useState();
	const [expertise, setExpertise] = useState();
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [eventListData, setEventListData] = useState({
		data        : {},
		toggleEvent : 'eventList',
	});

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

	useEffect(() => {
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
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		setExpertise,
		expertise,
		onClickBack,
		eventListData,
		setEventListData,
	};
}

export default useGetEventList;
