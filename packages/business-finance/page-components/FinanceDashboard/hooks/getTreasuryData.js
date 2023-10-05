import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useGetTreasuryStats = (tabs) => {
	const [treasuryFilters, setTreasuryFilters] = useState({
	});
	const { startDate, endDate } = treasuryFilters?.date || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'purchase/treasury/treasury-stats',
			method  : 'get',
			authKey : 'get_purchase_treasury_treasury_stats',
		},
		{ manual: true },
	);

	useEffect(() => {
		const getDahboardData = () => {
			try {
				trigger({
					params: {
						entityCode : tabs === 'all' ? ['101', '301'] : tabs,
						fromDate   : startDate ? format(startDate, 'yyyy-MM-dd 00:00:00', {}, false)
							: undefined,
						toDate: endDate
							? format(endDate, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		};
		getDahboardData();
	}, [tabs, endDate, startDate, trigger]);

	return {
		data,
		loading,
		treasuryFilters,
		setTreasuryFilters,
	};
};
export default useGetTreasuryStats;
