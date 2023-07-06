import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import { getFormatDate } from '../utils/getFormatDate';

interface FilterInterface {
	serviceType?:string
	timePeriod?:string
	dateRange?:DateInterface
	rest?:any
}

interface DateInterface {
	startDate?:Date
	endDate?:Date
}
const useJobStats = (filters :FilterInterface) => {
	const [{ data:jobStatsData, loading }, trigger] = useRequestBf(
		{
			url     : '/common/job/shipment-stats',
			method  : 'get',
			authKey : 'get_common_job_shipment_stats',
		},
		{ autoCancel: false },
	);
	const { serviceType, dateRange, timePeriod } = filters || {};
	const { startDate, endDate } = dateRange || {};

	const billDatesStart = 	getFormatDate(startDate);
	const billDatesEnd = 	getFormatDate(endDate);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						service    : serviceType || undefined,
						fromDate   : billDatesStart || undefined,
						toDate     : billDatesEnd || undefined,
						timePeriod : timePeriod || undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		getData();
	}, [trigger, billDatesEnd, billDatesStart, serviceType, timePeriod]);

	return { jobStatsData, loading };
};

export default useJobStats;
