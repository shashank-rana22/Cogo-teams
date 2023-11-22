import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetReimbursementStatus = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_reimbursement_statuses',
	}, { manual: true });

	const getReimbursementStatus = useCallback(
		async () => {
			await trigger();
		},
		[trigger],
	);

	useEffect(() => {
		try {
			getReimbursementStatus();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getReimbursementStatus]);

	return { loading, data, refetchexpense: getReimbursementStatus };
};

export default useGetReimbursementStatus;
