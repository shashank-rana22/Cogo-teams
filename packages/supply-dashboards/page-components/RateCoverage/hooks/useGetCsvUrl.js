import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import { HEADINGS } from '../configurations/helpers/constants';

const END_POINT_MAPPING = {
	fcl_freight       : 'get_fcl_freight_rate_job_csv_url',
	air_freight       : 'get_air_freight_rate_job_csv_url',
	lcl_freight       : 'get_lcl_freight_rate_job_csv_url',
	lcl_customs       : 'get_lcl_customs_rate_job_csv_url',
	air_customs       : 'get_air_customs_rate_job_csv_url',
	trailer           : 'get_trailer_freight_rate_job_csv_url',
	ltl_freight       : 'get_ltl_freight_rate_job_csv_url',
	haulage           : 'get_haulage_freight_rate_job_csv_url',
	fcl_customs       : 'get_fcl_customs_rate_job_csv_url',
	ftl_freight       : 'get_ftl_freight_rate_job_csv_url',
	fcl_cfs           : 'get_fcl_cfs_rate_job_csv_url',
	fcl_freight_local : 'get_fcl_freight_rate_local_job_csv_url',
	air_freight_local : 'get_air_freight_rate_local_job_csv_url',
};

const sources = Object.keys(HEADINGS);

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

		const isTodayDateRequired = filter?.status === 'completed';

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
			let is_flash_booking_reverted;
			if (filter?.is_flash_booking_reverted) {
				is_flash_booking_reverted = filter?.is_flash_booking_reverted === 'reverted';
			}
			const resp = await trigger({
				params: {
					filters: {
						...FINAL_FILTERS,
						status: filter?.status === 'completed' ? ['completed', 'aborted']
							: filter?.status,
						source                  : sources.includes(activeCard) ? activeCard : undefined,
						user_id                 : releventToMeValue ? user_id : FINAL_FILTERS?.user_id,
						is_flash_booking_reverted,
						...DATE_PARAMS,
						transport_modes_keyword : filter?.service === 'trailer' ? 'trailer' : undefined,
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
