// get_employee_dashboard_details

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

function useGetHistory() {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [{ loading, data = {} }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_modification_history_details',
		params : {
			employee_user_id : '83374b2e-7cd0-4340-951a-71d5d9da258e',
			start_date       : '2023-06-21',
			end_date         : '2023-07-20',
		},
	}, { manual: false });

	// const getEmployeeDetails = useCallback(() => {
	// 	try {
	// 		trigger();
	// 	} catch (err) {
	// 		Toast.error(getApiErrorString(err.response?.data));
	// 	}
	// }, [trigger]);

	// useEffect(() => {
	// 	getEmployeeDetails();
	// }, [getEmployeeDetails]);

	return {
		loading,
		data,
	};
}

export default useGetHistory;
