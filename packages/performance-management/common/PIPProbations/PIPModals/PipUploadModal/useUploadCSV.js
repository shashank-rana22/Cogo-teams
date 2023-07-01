import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useUploadCSV = ({ item = {}, params = {}, type, setModal, setRefetchList }) => {
	const [{ loading : uploadLoading = false }, trigger] = useIrisRequest({
		url    : type === 'correction' ? 'post_iris_update_file' : 'post_iris_create_file',
		method : 'post',
	}, { manual: true });

	const uploadCSVs = async (uploadedCSVFile) => {
		try {
			await trigger({
				data: {
					...(type === 'correction' ? { Url: uploadedCSVFile?.finalUrl, FileID: item.id } : {
						CsvUrl: uploadedCSVFile?.finalUrl,
						...(type === 'normalization' && {
							Year  : params.Year?.toString(),
							Month : params.Month?.toString(),
						}),
						CsvType  : type === 'normalization' ? 'approve_ratings' : type,
						FileName : uploadedCSVFile?.fileName,
					}),
				},
			});

			Toast.success('File sent for processing. Please check after some time...');
			setModal('');
			setRefetchList(true);
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	return { uploadLoading, uploadCSVs };
};

export default useUploadCSV;
