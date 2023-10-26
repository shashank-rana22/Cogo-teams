import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetExpenseData = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_expense_data',
	}, { manual: true });

	const getExpenseData = useCallback(
		async () => {
			await trigger({
			});
		},
		[trigger],
	);
	useEffect(() => {
		try {
			getExpenseData();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getExpenseData,
	]);

	return { loading, data, getExpenseData };
};

export default useGetExpenseData;
