import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const onClickViewSampleFile = (url) => {
	window.open(url, '_blank', 'noreferrer');
};

const useGetZipFile = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/download_employee_documents_zip',
		method : 'get',
	}, { manual: true });

	const downloadDocuments = async (id) => {
		try {
			await trigger({
				params: {
					employee_detail_id: id,
				},
			});

			onClickViewSampleFile(data?.zip_file_url);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, downloadDocuments };
};

export default useGetZipFile;
