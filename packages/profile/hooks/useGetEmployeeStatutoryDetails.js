import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeStatutoryDetails = (employee_id = '') => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_statutory_details',
	}, { manual: true });

	const getEmployeeStatutoryDetails = useCallback(() => {
		trigger({
			params: { employee_id },
		});
	}, [trigger, employee_id]);

	useEffect(() => {
		if (employee_id) {
			try {
				getEmployeeStatutoryDetails();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [employee_id, getEmployeeStatutoryDetails]);

	return { loading, data, getEmployeeStatutoryDetails };
};

export default useGetEmployeeStatutoryDetails;
