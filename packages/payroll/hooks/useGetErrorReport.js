import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetErrorReport = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_error_report',
	}, { manual: true });

	const getErrorReport = async (file) => {
		try {
			const promise = await trigger({
				params: { file_url: (typeof file === 'object') ? file.finalUrl : file },
			});
			window.open(promise.data, '_self');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, getErrorReport };
};

export default useGetErrorReport;
