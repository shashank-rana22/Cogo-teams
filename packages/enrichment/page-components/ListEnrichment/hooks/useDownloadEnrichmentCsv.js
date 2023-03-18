import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDownloadEnrichmentCsv = () => {
	const { profile = {}, general = {} } = useSelector((store) => store);

	const { user: { id: user_id = '' } } = profile;

	const { query: { partner_id = '' } } = general;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'feedback_response_csv',
		method  : 'GET',
		authkey : 'get_allocation_feedback_response_csv',
		headers : {},
	}, { manual: true });

	const onDownload = async () => {
		try {
			const payload = {
				user_id,
				partner_id,
			};

			const response = await trigger({
				params: payload,
			});

			// eslint-disable-next-line no-undef
			window.open(response?.data?.url?.uploaded_file_path, '_blank');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		loading,
		onDownload,
	};
};

export default useDownloadEnrichmentCsv;
