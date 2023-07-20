import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { getStatsParams } from '../utils/getStatsParams';

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

	const getStats = useCallback(() => {
		try {
			trigger({
				params: getStatsParams({ statsFilter, service, entity }),
			});
		} catch (err) {
			console.error(err);
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
