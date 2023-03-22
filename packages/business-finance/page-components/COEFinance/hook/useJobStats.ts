import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface FilterInterface {
	zone?:string
	serviceType?:string
	days?:string
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
	const { serviceType, dateRange } = filters || {};

	const billDatesStart = 	(dateRange?.startDate === undefined
		|| dateRange?.startDate === null)
		? null : format(dateRange?.startDate, "yyyy-MM-dd'T'HH:mm:ss", {}, false);

	const billDatesEnd = 	(dateRange?.startDate === undefined
            || dateRange?.startDate === null)
		? null : format(dateRange?.endDate, "yyyy-MM-dd'T'HH:mm:ss", {}, false);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {
						service  : serviceType || undefined,
						fromDate : billDatesStart || undefined,
						toDate   : billDatesEnd || undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger, filters]);

	return { jobStatsData, loading };
};

export default useJobStats;
