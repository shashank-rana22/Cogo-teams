import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeDetails = (id, path = false) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/get_employee_device_details',
		method : 'GET',
	}, { manual: true });

	const getEmployeeDetails = useCallback(
		() => {
			trigger({
				params: {
					// user_id            : path ? id : undefined,
					// employee_detail_id : path ? undefined : id,
					id,
					employee_details_required: true,
				},
			});
		},
		[id, trigger],
	);

	useEffect(() => {
		getEmployeeDetails();
	}, [getEmployeeDetails]);

	return { data, loading, refetch: getEmployeeDetails };
};

export default useGetEmployeeDetails;
