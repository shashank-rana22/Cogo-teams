import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const useGetCsvFile = (filter, activeCard) => {
	const END_POINT = 'generate_csv_file_url';
	const [url, setUrl] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : END_POINT,
		method : 'GET',
	}, { manual: true });

	const getCsvFile = useCallback(async () => {
		const { page, releventToMeValue, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) { FINAL_FILTERS[ele] = restFilters[ele]; }
		});

		try {
			const resp = await trigger({
				params: {
					filters: { ...FINAL_FILTERS, source: activeCard },
					page,
				},
			});
			if (resp?.data) {
				await setUrl(resp?.data?.url);
			}
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, filter, activeCard]);

	return {
		loading,
		getCsvFile,
		url,
		setUrl,
	};
};

export default useGetCsvFile;
