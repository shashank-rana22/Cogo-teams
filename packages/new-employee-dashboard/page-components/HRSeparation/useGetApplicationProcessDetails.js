/* eslint-disable custom-eslint/uuid-check */		// TODOs
import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetApplicationProcessDetails = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_application_process_details',
	}, { manual: true });

	const getApplicationProcessDetails = useCallback(
		() => {
			try {
				trigger({
					params: {
						off_boarding_application_id : 'f191ea65-dc5b-4d9d-ab8a-4c4833a87058',
						process_name                : 'hrbp_clearance',
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger],
	);

	useEffect(() => {
		getApplicationProcessDetails();
	}, [getApplicationProcessDetails]);

	return {
		loading,
		data,
		refetchApplicationDetails: getApplicationProcessDetails,
	};
};

export default useGetApplicationProcessDetails;
