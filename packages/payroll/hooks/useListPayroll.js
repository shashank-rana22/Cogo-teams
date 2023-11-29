import { useDebounceQuery } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useListPayroll = ({ listId = '' }) => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_payroll',
	}, { manual: true });

	const getListPayroll = useCallback(
		() => {
			const { page_limit, page, ...rest } = filters;
			trigger({
				params: {
					filters: {
						...rest,
						q  : query,
						id : listId,
					},
					page_limit,
					page,
				},
			});
		},
		[filters, query, trigger, listId],
	);

	useEffect(() => {
		getListPayroll();
	}, [getListPayroll, filters]);

	return { loading, data, filters, setFilters, debounceQuery, refetch: getListPayroll, query };
};

export default useListPayroll;
