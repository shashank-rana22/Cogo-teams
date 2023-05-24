import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

function useDownloadLogCsv() {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_download_log_csv',
		method : 'get',
	}, { manual: true });

	const downloadLogCSV = async (type) => {
		try {
			const response = await trigger({ params: { LogType: type } });
			if (response?.data.url) { window.open(response?.data.url); }
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	return { loading, downloadLogCSV };
}

export default useDownloadLogCsv;
