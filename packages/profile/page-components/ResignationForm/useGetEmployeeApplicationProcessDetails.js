import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeApplicationProcessDetails = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_application_details',
	}, { manual: true });

	const getEmployeeApplicationProcessDetails = useCallback(
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
		getEmployeeApplicationProcessDetails();
	}, [getEmployeeApplicationProcessDetails]);

	return {
		loading,
		data,
		refetch: getEmployeeApplicationProcessDetails,
	};
};

export default useGetEmployeeApplicationProcessDetails;
