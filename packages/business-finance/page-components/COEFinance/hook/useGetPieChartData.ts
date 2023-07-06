import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

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

const useGetPieChartData = (filters :FilterInterface) => {
	const [{ data:pieData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/bill-rejection-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_bill_rejection_stats',
		},
		{ autoCancel: false },
	);

	const { serviceType = '', dateRange, timePeriod } = filters || {};

	const billDatesStart = (dateRange?.startDate === undefined
		|| dateRange?.startDate === null)
		? null : format(dateRange?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

	const billDatesEnd = (dateRange?.startDate === undefined
            || dateRange?.startDate === null)
		? null : format(dateRange?.endDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false);

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
				toastApiError(err);
			}
		};
		getData();
	}, [trigger, billDatesEnd, billDatesStart, serviceType, timePeriod]);

	return { pieData, loading };
};

export default useGetPieChartData;
