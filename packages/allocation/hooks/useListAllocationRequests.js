import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListAllocationRequests = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();

	const [params, setParams] = useState({
		sort_by       : 'created_at',
		sort_type     : 'desc',
		page_limit    : 10,
		page          : 1,
		data_required : true,
		filters       : {
			status       : 'pending',
			service_type : 'organization',
		},
	});

	const apiData = useRequest({
		url    : '/list_allocation_requests',
		method : 'get',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = apiData;

	const onChangeParams = useCallback((values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	}, []);

	useEffect(() => {
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	return {
		data,
		loading,
		refetch,
		params,
		setParams,
		onChangeParams,
		debounceQuery,
		searchValue,
		setSearchValue,
	};
};

export default useListAllocationRequests;
