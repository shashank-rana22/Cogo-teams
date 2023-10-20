import { useDebounceQuery } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useGetListTransactions = () => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_transaction',
	}, { manual: true });

	const getListAllTransactions = useCallback(
		async () => {
			const { page_limit, page, ...rest } = filters;
			await trigger({
				params: {
					filters: {
						...rest,
						q: query,
					},
					page_limit,
					page,
				},
			});
		},
		[filters, query, trigger],
	);

	useEffect(() => {
		getListAllTransactions();
	}, [getListAllTransactions]);

	return { loading, data, filters, setFilters, debounceQuery };
};

export default useGetListTransactions;
