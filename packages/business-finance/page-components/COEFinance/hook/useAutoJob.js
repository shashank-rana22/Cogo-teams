import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useAutoJob = ({ setOpenConfig = () => {}, setConfigButton = false }) => {
	const [searchValue, setSearchValue] = useState('');
	const { query, debounceQuery } = useDebounceQuery();
	const [params, setParams] = useState({
		pageSize : 10,
		page     : 1,
	});
	const { page:newPage } = params || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/common/job/get-job-closure-rules',
			method  : 'get',
			authKey : 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	const onQueryChange = (value) => {
		debounceQuery(value);
		setSearchValue(value);
		setParams((previousParams) => ({
			...previousParams,
			page: 1,
		}));
	};

	const refetch = useCallback(() => {
		trigger({
			params: {
				service   : query || undefined,
				pageIndex : newPage,
			},
		});
	}, [query, trigger, newPage]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	const getNextPage = ({ page }) => {
		setParams((previousParams) => ({
			...previousParams,
			page,
		}));
		setConfigButton(true);
		setOpenConfig([]);
	};
	return {
		data,
		loading,
		setSearchValue,
		onQueryChange,
		searchValue,
		refetch,
		getNextPage,
	};
};
export default useAutoJob;
