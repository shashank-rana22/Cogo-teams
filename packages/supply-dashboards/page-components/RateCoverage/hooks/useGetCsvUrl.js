import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useGetCsvFile = (filter, activeCard) => {
	const END_POINT = 'generate_csv_file_url';

	const [{ loading }, trigger] = useRequest({
		url    : END_POINT,
		method : 'GET',
	}, { manual: true });

	const getCsvFile = async () => {
		const { page, releventToMeValue, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				FINAL_FILTERS[ele] = restFilters[ele];
			}
		});

		try {
			const resp = await trigger({
				params: {
					filters: { ...FINAL_FILTERS, source: activeCard },
					page,
				},
			});
			if (resp?.data) {
				return resp?.data?.url;
			}
		} catch (err) {
			Toast.error('Download failed');
		}
		return null;
	};

	return {
		loading,
		getCsvFile,
	};
};

export default useGetCsvFile;
