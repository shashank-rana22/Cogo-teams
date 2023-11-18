import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useBulkUploadPayloadData = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/bulk_upload_payroll_data',
	}, { manual: true });

	const uploadBulkPayrollData = useCallback(
		async ({ payload, value = 'file' }) => {
			let res = {};
			console.log('payloadName', value);
			try {
				res = await trigger({
					data: { [value]: payload },
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
			return res;
		},
		[trigger],
	);

	return { loading, data, uploadBulkPayrollData };
};

export default useBulkUploadPayloadData;
