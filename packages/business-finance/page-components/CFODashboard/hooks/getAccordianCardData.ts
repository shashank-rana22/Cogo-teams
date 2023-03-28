import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetAccordianCardData = ({ globalFilters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-service-wise-rec-pay',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_service_wise_rec_pay',
		},
		{ manual: true },
	);
	const { startDate, endDate } = globalFilters?.date || {};
	const refetch = () => {
		try {
			trigger({
				params: {
					startDate: startDate ? format(startDate as Date, 'yyyy-MM-dd', {}, false)
						: undefined,
					endDate: endDate
						? format(endDate as Date, 'yyyy-MM-dd', {}, false) : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, [globalFilters?.date]);

	return {
		accordianDataLoading : loading,
		accordianDataData    : data,
		refetch,

	};
};

export default useGetAccordianCardData;
