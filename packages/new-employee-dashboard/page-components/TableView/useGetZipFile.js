import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const onClickViewSampleFile = (url) => {
	window.open(url, '_blank', 'noreferrer');
};
const useGetZipFile = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/download_employee_documents_zip',
		method : 'get',
	}, { manual: true });

	const downloadDocuments = async (id) => {
		try {
			const res = await trigger({
				params: {
					employee_detail_id: id,
				},
			});

			const url = res?.data?.zip_file_url;

			if (url) {
				onClickViewSampleFile(url);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, downloadDocuments };
};

export default useGetZipFile;
