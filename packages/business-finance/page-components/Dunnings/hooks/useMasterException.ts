import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useMasterException = ({ exceptionFilter, sort, subTabsValue }) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const { category = '', creditDays = 0 } = exceptionFilter || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/master-exceptions',
			method  : 'get',
			authKey : 'get_payments_dunning_master_exceptions',
		},
		{ manual: true },
	);
	const [{ data:cycleWiseData, loading:cycleWiseLoading }, cycleWiseApi] = useRequestBf(
		{
			url     : '/payments/dunning/list-dunning',
			method  : 'get',
			authKey : 'get_payments_dunning_list_dunning',
		},
		{ manual: true },
	);
	const [{ loading: deleteMasterLoading }, deleteMasterApi] = useRequestBf(
		{
			url     : '/payments/dunning/delete-master-exception',
			method  : 'psot',
			authKey : 'get_payments_dunning_delete_master_exception',
		},
		{ manual: true },
	);
	const { query = '', debounceQuery } = useDebounceQuery();
	// const SORT_KEY = Object.keys(sort);
	// const SORT_VALUE = Object.values(sort);
	// const sortingHandle = sort === 'Asc' || sort === 'Desc';
	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue, debounceQuery]);

	const getMasterList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						segmentation : category || undefined,
						creditDays   : creditDays ? parseInt(creditDays, 10) : undefined,
						query        : query || undefined,
						pageIndex    : exceptionFilter?.pageIndex,
						// sortType     : SORT_KEY || undefined,
						// sortBy       : SORT_VALUE || undefined,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [category, creditDays, query, exceptionFilter, trigger]);

	const getCycleWiseList = useCallback(() => {
		(async () => {
			try {
				await cycleWiseApi({
					params: {
						query     : query || undefined,
						pageIndex : exceptionFilter?.pageIndex,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [query, exceptionFilter, cycleWiseApi]);

	const deleteMasterException = useCallback(() => {
		(async () => {
			try {
				await deleteMasterApi({
					params: {

					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [deleteMasterApi]);

	useEffect(() => {
		if (subTabsValue === 'masterExceptionList') {
			getMasterList();
		} else {
			getCycleWiseList();
		}
	}, [getMasterList, getCycleWiseList, subTabsValue]);

	return {
		data,
		loading,
		getMasterList,
		cycleWiseData,
		cycleWiseLoading,
		getCycleWiseList,
		searchValue,
		setSearchValue,

	};
};

export default useMasterException;
