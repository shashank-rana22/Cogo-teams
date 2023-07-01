import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

interface ItemProps {
	activeEntity:string;
}

const useGetTreasuryStats = ({ activeEntity }:ItemProps) => {
	const [filters, setFilters] = useState({
		Date: undefined,
	});

	const {
		Date,
	} = filters || {};

	const { startDate, endDate } = Date || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : 'purchase/treasury/treasury-stats',
			method  : 'get',
			authKey : 'get_purchase_treasury_treasury_stats',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						fromDate: startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
							: undefined,
						toDate: endDate
							? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
						entityCode: [activeEntity],
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [endDate, startDate, activeEntity, trigger]);

	useEffect(() => {
		getDahboardData();
	}, [Date, getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetTreasuryStats;
