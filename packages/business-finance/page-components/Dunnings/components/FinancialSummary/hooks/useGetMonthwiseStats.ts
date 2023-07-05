import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface Props {
	statsFilter?: {
		year?: string | number;
		viewType?: string;
	}
}

function useGetMonthwiseStats({ statsFilter }:Props) {
	const { year, viewType } = statsFilter || {};
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
		try {
			await trigger({
				params: {
					year,
					viewType,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}, [trigger, viewType, year]);

	useEffect(() => {
		getStats();
	}, [getStats]);

	return {
		statsData: data,
		loading,
	};
}

export default useGetMonthwiseStats;
