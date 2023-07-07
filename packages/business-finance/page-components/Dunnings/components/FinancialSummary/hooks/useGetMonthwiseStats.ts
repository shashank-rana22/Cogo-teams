import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

interface Props {
	statsFilter?:string;
	filters?: {
		service?: string[];
		entity?: string[];
	};
}

function useGetMonthwiseStats({ statsFilter, filters }:Props) {
	const { service, entity } = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/month-wise-statistics-of-account-utilization',
			method  : 'get',
			authKey : 'get_payments_dunning_month_wise_statistics_of_account_utilization',
		},
		{ manual: true },
	);

	const getStats = useCallback(async () => {
		const filtersSeperated = statsFilter?.split('-');
		const viewType = (filtersSeperated)?.shift(); // selecting the first element for year
		const year = filtersSeperated?.shift(); // selecting first year for both calender & financial year

		try {
			await trigger({
				params: {
					year,
					viewType,
					serviceTypes : !isEmpty(service) ? service : undefined,
					entityCodes  : !isEmpty(entity) ? entity : undefined,
				},
			});
		} catch (err) {
			console.error('err-', err);
		}
	}, [statsFilter, trigger, entity, service]);

	useEffect(() => {
		getStats();
	}, [getStats]);

	return {
		statsData: data,
		loading,
	};
}

export default useGetMonthwiseStats;
