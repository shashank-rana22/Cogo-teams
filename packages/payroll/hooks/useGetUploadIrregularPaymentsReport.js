import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetUploadIrregularPaymentsReport = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/upload_irregular_payments_report',
	}, { manual: true });

	const getUploadIrregularPaymentsReport = useCallback(
		async (file) => {
			try {
				await trigger({
					data: { file_url: (typeof file === 'object') ? file.finalUrl : file },
				});
			} catch (error) {
				console.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger],
	);

	return { loading, data, getUploadIrregularPaymentsReport };
};

export default useGetUploadIrregularPaymentsReport;
