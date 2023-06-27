import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface FilterInterface {
	zone?:string
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
	const { zone, serviceType, dateRange, timePeriod } = filters || {};
	const { startDate, endDate } = dateRange || {};

	const billDatesStart = 			formatDate({
		date       : startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});

	const billDatesEnd = 	formatDate({
		date       : endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						zone       : zone || undefined,
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
	}, [trigger, billDatesEnd, billDatesStart, serviceType, timePeriod, zone]);

	return { jobStatsData, loading };
};

export default useJobStats;
