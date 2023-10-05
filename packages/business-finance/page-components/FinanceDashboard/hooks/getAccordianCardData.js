import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetAccordianCardData = ({ globalFilters, entityTabFilters }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-service-wise-rec-pay',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_service_wise_rec_pay',
		},
		{ manual: true },
	);
	const { startDate, endDate } = globalFilters?.date || {};

	useEffect(() => {
		const refetch = () => {
			try {
				trigger({
					params: {
						entityCode : entityTabFilters,
						startDate  : startDate ? format(startDate, 'yyyy-MM-dd', {}, false)
							: undefined,
						endDate: endDate
							? format(endDate, 'yyyy-MM-dd', {}, false) : undefined,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [globalFilters?.date, endDate, startDate, trigger, entityTabFilters]);

	return {
		accordianDataLoading : loading,
		accordianDataData    : data,
	};
};

export default useGetAccordianCardData;
