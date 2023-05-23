import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetJvList = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/list',
			authKey : 'get_payments_parent_jv_list',
			method  : 'get',
		},
		{ manual: true },
	);

	const { category, status, query: search, page = 1, sortType, sortBy } = filters || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const refetch = () => {
		trigger({
			params: {
				page,
				pageLimit : 10,
				category  : category || undefined,
				status    : status || undefined,
				query     : query || undefined,
				sortBy    : sortBy || undefined,
				sortType  : sortType || undefined,
			},
		});
	};

	useEffect(() => {
		trigger({
			params: {
				page,
				pageLimit : 10,
				category  : category || undefined,
				status    : status || undefined,
				query     : query || undefined,
				sortBy    : sortBy || undefined,
				sortType  : sortType || undefined,
			},
		});
	}, [trigger, status, category, query, page, sortType, sortBy]);

	return {
		data,
		loading,
		refetch,
	};
};

export default useGetJvList;
