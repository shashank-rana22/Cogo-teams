import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetEmployeeDetails({ id = '' }) {
	const [{ loading = false, data = {} }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : 'get_employee_details',
	}, { manual: true });

	console.log(data, 'getempdetails');

	const getEmployeeDetails = useCallback(() => {
		try {
			trigger({
				params: {
					id: '85cdcf6b-bd52-4fea-b136-12e377c48ecc' || id,
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
