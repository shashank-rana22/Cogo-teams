import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeDetails = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_application_details',
	}, { manual: true });

	const getApplicationDetails = useCallback(
		() => {
			try {
				trigger();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger],
	);

	useEffect(() => {
		getApplicationDetails();
	}, [getApplicationDetails]);

	return {
		loading,
		data,
		refetchApplicationDetails: getApplicationDetails,
	};
};

export default useGetEmployeeDetails;
