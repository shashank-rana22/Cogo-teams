import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetNextPayroll = ({ return_list = true }) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_next_payroll_cycle',
	}, { manual: true });

	const getNextPayroll = useCallback(
		async () => {
			console.log('working');
			try {
				await trigger({
					params: {
						return_list,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger, return_list],
	);

	useEffect(() => {
		getNextPayroll();
	}, [getNextPayroll]);

	return { loading, data, getNextPayroll };
};

export default useGetNextPayroll;
