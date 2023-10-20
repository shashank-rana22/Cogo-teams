import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDownloadPayrollDetails = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/download_payroll_details',
	}, { manual: true });

	const createDownload = async (payroll_id) => {
		try {
			const res = await trigger({
				params: {
					payroll_id,
				},
			});
			window.open(res?.data, '_self');
			Toast.success('Payroll details downloaded successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, createDownload };
};

export default useDownloadPayrollDetails;
