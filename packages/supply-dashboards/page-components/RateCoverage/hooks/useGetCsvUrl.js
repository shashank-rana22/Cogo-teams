import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const END_POINT_MAPPING = {
	fcl_freight : 'get_fcl_freight_rate_job_csv_url',
	air_freight : 'get_air_freight_rate_job_csv_url',
};

const useGetCsvFile = (filter, activeCard) => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const [urlList, setUrlList] = useState([]);
	const { user: { id: user_id = '' } = {} } = user_data;
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

		const isTodayDateRequired = ['pending', 'completed'].includes(filter?.status);

		const DATE_PARAMS = {};

		if (isTodayDateRequired) {
			DATE_PARAMS.start_date = new Date();
		}
		if (isTodayDateRequired) {
			DATE_PARAMS.end_date = new Date();
		}
		if (filter?.start_date) { DATE_PARAMS.start_date = filter?.start_date; }
		if (filter?.end_date) { DATE_PARAMS.end_date = filter?.end_date; }

		try {
			const resp = await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						source  : activeCard || undefined,
						user_id : releventToMeValue ? user_id : FINAL_FILTERS?.user_id,
						...DATE_PARAMS,
					},
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
