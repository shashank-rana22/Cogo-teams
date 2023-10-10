import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeApplicationProcessDetails = (user_id = '') => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_application_details',
	}, { manual: true });

	const getEmployeeApplicationProcessDetails = useCallback(
		() => {
			try {
				const params = !user_id ? {} : {
					params: {
						employee_user_id    : user_id,
						action_performed_by : 'hrbp',
					},
				};

				trigger(params);
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger, user_id],
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
