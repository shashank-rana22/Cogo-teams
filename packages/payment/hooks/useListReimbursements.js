import { useDebounceQuery } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useListReimbursements = ({ toggleValue, value }) => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_reimbursement',
	}, { manual: true });

	const { query = '', debounceQuery } = useDebounceQuery();
	const listReimbursements = useCallback(
		async () => {
			const { page_limit, page, ...rest } = filters;
			await trigger({
				params: {
					filters: {
						year : value,
						...rest,
						q    : query,
					},
					page_limit,
					page,
					employee_view: toggleValue,
				},
			});
		},
		[filters, query, toggleValue, trigger, value],
	);

	useEffect(() => {
		listReimbursements();
	}, [listReimbursements, filters]);

	return { loading, data, filters, setFilters, refetchlist: listReimbursements, debounceQuery, query };
};

export default useListReimbursements;
