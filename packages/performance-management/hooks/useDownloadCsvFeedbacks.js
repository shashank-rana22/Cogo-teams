import { useIrisRequest } from '@cogoport/request';

const useDownloadCsvFeedbacks = ({ params = {} }) => {
	const [{ data = {}, loading = false }, trigger] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_download_csv',
	}, { manual: true });

	const getUserListCsv = async () => {
		const response = await trigger({ params });

		if (response.data?.url) { window.open(response.data.url, '_blank'); }
	};

	return {
		url: data,
		loading,
		getUserListCsv,
	};
};

export default useDownloadCsvFeedbacks;
