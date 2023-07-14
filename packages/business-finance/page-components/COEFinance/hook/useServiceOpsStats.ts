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
const useServiceOpsStats = (filters :FilterInterface) => {
	const [{ data:So2statsData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/so2-success-rate',
			method  : 'get',
			authKey : 'get_purchase_bills_so2_success_rate',
		},
		{ autoCancel: false },
	);
	const { serviceType = '', dateRange, timePeriod } = filters || {};
	const { startDate, endDate } = dateRange || {};

	const billDatesStart = (dateRange?.startDate === undefined
		|| dateRange?.startDate === null)
		? null : getFormatDate(startDate);

	const billDatesEnd = (dateRange?.startDate === undefined
            || dateRange?.startDate === null)
		? null : getFormatDate(endDate);

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
	}, [trigger, serviceType, billDatesEnd, billDatesStart, timePeriod]);

	return { So2statsData, loading };
};

export default useServiceOpsStats;
