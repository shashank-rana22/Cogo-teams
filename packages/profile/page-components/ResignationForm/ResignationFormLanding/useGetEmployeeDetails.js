import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEmployeeDetails = (user_id = '') => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_application_details',
	}, { manual: true });

	const getApplicationDetails = useCallback(
		() => {
			try {
				if (!user_id) {
					trigger();
				} else {
					trigger({
						params: {
							employee_user_id    : user_id,
							action_performed_by : 'hrbp',
						},
					});
				}
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger, user_id],
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
