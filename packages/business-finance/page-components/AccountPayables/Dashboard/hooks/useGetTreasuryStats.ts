import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useGetTreasuryStats = () => {
	const [filters, setFilters] = useState({
		Date: undefined,
	});

	const {
		Date,
		...rest
	} = filters || {};

	const { startDate, endDate } = Date || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : 'purchase/treasury/treasury-stats',
			method  : 'get',
			authKey : 'get_purchase_treasury_stats',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					fromDate: startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
						: undefined,
					toDate: endDate
						? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), Date]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetTreasuryStats;
