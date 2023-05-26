import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetEmployeeDetails({ id = '' }) {
	const [{ loading = false, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : 'get_employee_details',
	}, { manual: true });

	const getEmployeeDetails = useCallback(() => {
		try {
			trigger({
				params: {
					id: 'be4fc4d9-220c-4853-bcba-b6d8e2c9b837' || id,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [id, trigger]);

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
