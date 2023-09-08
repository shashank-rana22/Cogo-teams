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
						off_boarding_application_id : '9e0f52c9-da4a-43fb-bd16-772cdc8f8bda',
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

	return { loading, data };
};

export default useGetApplicationProcessDetails;
