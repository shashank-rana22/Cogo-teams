import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetFinanceClearanceProcessDetails = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_application_process_details',
	}, { manual: true });

	const getFinanceClearanceProcessDetails = useCallback(
		() => {
			try {
				trigger({
					params: {
						off_boarding_application_id : 'f191ea65-dc5b-4d9d-ab8a-4c4833a87058',
						process_name                : 'finance_clearance',
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger],
	);

	useEffect(() => {
		getFinanceClearanceProcessDetails();
	}, [getFinanceClearanceProcessDetails]);

	return {
		loading,
		data,
		refetchApplicationDetails: getFinanceClearanceProcessDetails,
	};
};

export default useGetFinanceClearanceProcessDetails;
