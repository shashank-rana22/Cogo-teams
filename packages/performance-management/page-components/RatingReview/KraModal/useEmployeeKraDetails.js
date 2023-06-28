import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useEmployeeKraDetails({ show }) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_employee_kra_details',
		method : 'GET',
	}, { manual: true });

	const employeeKraDetails = useCallback(() => {
		try {
			trigger({
				params: {
					employee_id : show,
					start_date  : '2023-06-21',
					end_date    : '2023-07-20',
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [show, trigger]);

	useEffect(() => {
		employeeKraDetails();
	}, [employeeKraDetails]);

	return {
		data,
		loading,
		employeeKraDetails,
	};
}

export default useEmployeeKraDetails;
