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
const useServiceOpsStats = (filters :FilterInterface) => {
	const [{ data:So2statsData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/so2-success-rate',
			method  : 'get',
			authKey : 'get_purchase_bills_so2_success_rate',
		},
		{ autoCancel: false },
	);
	const { zone = '', serviceType = '', dateRange, rest } = filters || {};

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
						...rest,
						zone     : zone || undefined,
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
	}, [trigger, zone, serviceType, billDatesEnd]);

	return { So2statsData, loading };
};

export default useServiceOpsStats;
