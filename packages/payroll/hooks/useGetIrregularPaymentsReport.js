import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetIrregularPaymentsReport = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/download_irregular_payments_report',
	}, { manual: true });

	const getIrregularPaymentsReport = async () => {
		try {
			const promise = await trigger();

			window.open(promise.data, '_self');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, getIrregularPaymentsReport };
};

export default useGetIrregularPaymentsReport;
