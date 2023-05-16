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

	const { category, status, query:search } = filters || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		trigger({
			params: {
				page      : 1,
				pageLimit : 10,
				category  : category || undefined,
				status    : status || undefined,
				query     : query || undefined,
			},
		});
	}, [trigger, status, category, query]);

	return {
		data,
		loading,
	};
};

export default useGetJvList;
