import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeDirectoryPaymentDetail = (user_id = '') => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_directory_payment_detail',
	}, { manual: true });

	const getEmployeePaymentDetails = useCallback(() => {
		trigger({
			params: { user_id },
		});
	}, [trigger, user_id]);

	useEffect(() => {
		if (user_id) {
			try {
				getEmployeePaymentDetails();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [user_id, getEmployeePaymentDetails]);

	return { loading, data, getEmployeePaymentDetails };
};

export default useGetEmployeeDirectoryPaymentDetail;
