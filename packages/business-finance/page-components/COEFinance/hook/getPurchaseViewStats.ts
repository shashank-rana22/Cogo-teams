import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const usePurchaseViewStats = () => {
	const [{ loading: statsLoading, data: statsData }, statsTrigger] = useRequestBf(
		{
			url     : '/purchase/bills/stats',
			method  : 'get',
			authKey : 'get_purchase_bills_stats',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const getStatsData = async () => {
			try {
				await statsTrigger({
					params: {
						jobTypeShipment: 'false',
					},
				});
			} catch (err) {
				Toast.error('stats data not present');
			}
		};
		getStatsData();
	}, [statsTrigger]);

	return {
		statsLoading,
		statsData,
	};
};

export default usePurchaseViewStats;
