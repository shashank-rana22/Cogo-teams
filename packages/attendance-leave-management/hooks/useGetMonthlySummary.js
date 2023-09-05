import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetMonthlySummary = (cycle_id) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_monthly_summary',

	}, { manual: true });

	const getMonthlySummary = useCallback(
		() => {
			trigger({
				params: {
					cycle_id,
				},
			});
		},
		[cycle_id, trigger],
	);

	useEffect(() => {
		if (cycle_id) {
			try {
				getMonthlySummary();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [cycle_id, getMonthlySummary]);

	return { loading, data };
};

export default useGetMonthlySummary;
