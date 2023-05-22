import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetEmployeeDetails() {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : 'get_employee_details',
	}, { manual: false });

	const getEmployeeDetails = useCallback(() => {
		try {
			trigger({
				params: {
					id: '85cdcf6b-bd52-4fea-b136-12e377c48ecc',
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		getEmployeeDetails();
	}, [getEmployeeDetails]);

	return {
		loading,
		data,
		getEmployeeDetails,
	};
}

export default useGetEmployeeDetails;
