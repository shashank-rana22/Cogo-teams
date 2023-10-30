import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetDownloadDetails = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/download_payroll_details_for_finance',
	}, { manual: true });

	const createDownload = async ({ id }) => {
		try {
			const res = await trigger({
				params: {
					payroll_id: id,
				},
			});
			window.open(res?.data, '_self');
			Toast.success('Attendance Report Downloaded successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, createDownload };
};

export default useGetDownloadDetails;
