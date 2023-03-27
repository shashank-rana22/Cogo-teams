import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useGetTreasuryStats = (tabs) => {
	const [treasuryFilters, setTreasuryFilters] = useState({
	});
	const {
		...rest
	} = treasuryFilters || {};
	const { startDate, endDate } = treasuryFilters?.date || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'purchase/treasury/treasury-stats',
			method  : 'get',
			authKey : 'get_purchase_treasury_stats',
		},
		{ manual: true },
	);

	const getDahboardData = () => {
		try {
			trigger({
				params: {
					entity   : tabs === '101' || tabs === '301' ? tabs : undefined,
					fromDate : startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
						: undefined,
					toDate: endDate
						? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), tabs]);

	return {
		data,
		loading,
		getDahboardData,
		treasuryFilters,
		setTreasuryFilters,
	};
};
export default useGetTreasuryStats;
