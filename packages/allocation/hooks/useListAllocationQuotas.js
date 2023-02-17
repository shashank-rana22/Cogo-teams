import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListAllocationQuotas = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();
	const [quotaItem, setQuotaItem] = useState(null);

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status     : 'active',
			quota_type : 'role',
		},
	});

	const api = useAllocationRequest({
		url     : '/quotas',
		method  : 'get',
		authkey : 'get_allocation_quotas',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = api;

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		if (searchQuery) {
			setParams((prevParams) => ({
				...prevParams,
				filters: {
					...prevParams.filters,
					q: searchQuery || undefined,
				},
			}));
		}
	}, [searchQuery]);

	return {
		data,
		loading,
		getNextPage,
		params,
		setParams,
		quotaItem,
		setQuotaItem,
		refetch,
		debounceQuery,
		searchValue,
		setSearchValue,
	};
};

export default useListAllocationQuotas;
