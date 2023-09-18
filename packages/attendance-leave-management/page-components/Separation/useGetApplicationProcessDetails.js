import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetApplicationProcessDetails = () => {
	const { query } = useSelector((state) => state.general);

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_application_process_details',
	}, { manual: true });

	const getApplicationProcessDetails = useCallback(
		() => {
			try {
				trigger({
					params: {
						off_boarding_application_id : query?.application_id,
						process_name                : query?.process_name,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[query?.application_id, query?.process_name, trigger],
	);

	useEffect(() => {
		getApplicationProcessDetails();
	}, [getApplicationProcessDetails]);

	return {
		loading,
		data,
		refetchApplicationDetails : getApplicationProcessDetails,
		process_name              : query?.process_name,
	};
};

export default useGetApplicationProcessDetails;
