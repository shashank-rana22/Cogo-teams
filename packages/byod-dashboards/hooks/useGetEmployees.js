import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployees = (id) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_employee_details',
		method : 'GET',
	}, { manual: true });

	const getEmployees = useCallback(
		() => {
			trigger({
				params: {
					user_id                              : id,
					reimbursement_group_details_required : true,
				},
			});
		},
		[id, trigger],
	);

	useEffect(() => {
		getEmployees();
	}, [getEmployees]);

	return { data, loading, refetch: getEmployees };
};

export default useGetEmployees;
