import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const END_POINT_MAPPING = {
	fcl_freight : 'get_fcl_freight_rate_job_csv_url',
	air_freight : 'get_air_freight_rate_job_csv_url',
};

const useGetCsvFile = (filter, activeCard) => {
	const [urlList, setUrlList] = useState([]);
	const [{ loading }, trigger] = useRequest({
		url    : END_POINT_MAPPING[filter?.service],
		method : 'GET',
	}, { manual: true });

	const getCsvFile = async () => {
		const { releventToMeValue, start_date, end_date, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				FINAL_FILTERS[ele] = restFilters[ele];
			}
		});

		const params = ['pending', 'completed', 'backlog'].includes(activeCard) ? {
			start_date : new Date(),
			end_date   : new Date(),
			status     : activeCard,
		} : {
			start_date, end_date, source: activeCard,
		};

		try {
			const resp = await trigger({
				params: {
					filters: { ...FINAL_FILTERS, ...params },
				},
			});
			if (resp?.data) {
				setUrlList(resp?.data?.urls || []);
			}
		} catch (err) {
			Toast.error('Download failed');
		}
	};

	return {
		loading,
		getCsvFile,
		urlList,
	};
};

export default useGetCsvFile;
