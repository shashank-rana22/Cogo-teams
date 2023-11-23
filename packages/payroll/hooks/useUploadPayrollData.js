import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUploadPayrollData = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/upload_payroll_data',
	}, { manual: true });

	const updatePayrollData = useCallback(
		async ({ payload }) => {
			let res = {};
			try {
				res = await trigger({
					data: { payload },
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
			return res;
		},
		[trigger],
	);

	return { loading, data, updatePayrollData };
};

export default useUploadPayrollData;
