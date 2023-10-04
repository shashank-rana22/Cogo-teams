import { useRequestBf } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useShipmentIdStats = ({ month, year, entityCode }) => {
	const [statsData, setStatsData] = useState({});

	const [
		{ data, loading:statsLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/pnl/dashboard/shipment-statistics',
			method  : 'get',
			authKey : 'get_pnl_dashboard_shipment_statistics',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			const resp = await trigger({
				params: {
					Year       : year || undefined,
					Month      : month || undefined,
					entityCode : entityCode || undefined,
				},
			});
			setStatsData(resp?.data);
		} catch (error) {
			toastApiError(error);
			setStatsData({});
		}
	}, [entityCode, month, trigger, year]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		statsData,
		statsLoading,
		data,
	};
};
export default useShipmentIdStats;
