import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDownloadOutstandingDetails = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/download_outstanding_sheet',
	}, { manual: true });

	const getDownloadOutstandingFileLink = async (off_boarding_application_id) => {
		try {
			await	trigger({
				params: {
					application_id: off_boarding_application_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		downloadlink: data,
		getDownloadOutstandingFileLink,
	};
};

export default useDownloadOutstandingDetails;
