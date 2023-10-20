import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeDetails = (user_id = '') => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_directory',
	}, { manual: true });

	const getEmployeeDetails = useCallback(() => {
		trigger({
			params: { user_id },
		});
	}, [trigger, user_id]);

	useEffect(() => {
		if (user_id) {
			try {
				getEmployeeDetails();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [user_id, getEmployeeDetails]);

	return { loading, data, getEmployeeDetails };
};

export default useGetEmployeeDetails;
