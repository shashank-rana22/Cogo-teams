import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployees = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : 'list_employee_device_details',
		method : 'GET',
	}, { manual: true });

	const getEmployees = useCallback(() => {
		try {
			trigger({
				params: {
					employee_details_required : true,
					required_keys             : ['id', 'employee_detail_id', 'status'],
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [trigger]);

	useEffect(() => {
		getEmployees();
	}, [getEmployees]);

	return { data, loading };
};

export default useGetEmployees;
