import { useHarbourRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useListReimbursements = ({ toggleValue }) => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_reimbursement',
	}, { manual: true });

	const listReimbursements = useCallback(
		async () => {
			const { page_limit, page, ...rest } = filters;
			await trigger({
				params: {
					filters: {
						...rest,
					},
					page_limit,
					page,
					employee_view: toggleValue,
				},
			});
		},
		[filters, toggleValue, trigger],
	);

	useEffect(() => {
		listReimbursements();
	}, [listReimbursements, filters]);

	return { loading, data, filters, setFilters, refetchlist: listReimbursements };
};

export default useListReimbursements;
