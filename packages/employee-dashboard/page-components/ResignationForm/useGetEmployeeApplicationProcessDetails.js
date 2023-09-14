/* eslint-disable custom-eslint/uuid-check */		// TODOs
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
				trigger({
					params: {
						off_boarding_application_id: 'f191ea65-dc5b-4d9d-ab8a-4c4833a87058',
					},
				});
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
		refetchApplicationDetails: getEmployeeApplicationProcessDetails,
	};
};

export default useGetEmployeeApplicationProcessDetails;
