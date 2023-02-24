import { useRequest } from '@cogoport/request';

const useDownloadCsvFeedbacks = ({ params = {} }) => {
	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'download_csv',
	}, { manual: true });

	const getUserListCsv = async () => {
		const response = await trigger({ params });

		// eslint-disable-next-line no-undef
		window.open(response?.data, '_blank');
	};

	return {
		url: data,
		loading,
		getUserListCsv,
	};
};

export default useDownloadCsvFeedbacks;
