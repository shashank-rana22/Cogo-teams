import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useDownloadRequestOrgData = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'lead_data_url',
		method : 'get',
	}, { manual: true });

	const downloadFile = async (id = '') => {
		try {
			const res = await trigger({
				params: {
					enrichment_request_id: id,
				},
			});
			const { data: { file_url } } = res || {};
			if (file_url) window.open(file_url);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Download');
		}
	};

	return {
		loading,
		downloadFile,
	};
};

export default useDownloadRequestOrgData;
