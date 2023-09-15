import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetLeaveGroupings = (type) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_groupings',
	}, { manual: true });

	const getLeaveGroupings = useCallback(
		() => {
			trigger({
				params: {
					request_type: type === 'employee' ? 'employee' : undefined,
				},
			});
		},
		[trigger, type],
	);

	useEffect(() => {
		if (type) {
			try {
				getLeaveGroupings();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [getLeaveGroupings, type]);

	return { loading, data };
};

export default useGetLeaveGroupings;
