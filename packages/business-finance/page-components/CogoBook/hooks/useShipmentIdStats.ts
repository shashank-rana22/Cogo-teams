import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

interface StatsDataInterface {
	bookedShipmentCount?: number
	accruedShipmentCount?: number
	bookedProfitPercentage?: number
	bookedProfit?: number
	actualProfit?: number
	actualProfitPercentage?: number
	variance?: number
	variancePercentage?: number
	varianceExpense?: number
	varianceIncome?: number
	expenseCurrency?: string
	expenseBookedSum?: number
	expenseAccruedSum?: number
	incomeBookedSum?: number
	incomeAccruedSum?: number
	incomeCurrency?: string
	varianceCurrency?: string
}
interface StatsInterface {
	month?:string
	year?:string
	entityCode?:string
}

const useShipmentIdStats = ({ month, year, entityCode }:StatsInterface) => {
	const [statsData, setStatsData] = useState<StatsDataInterface>({});

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
					entityCode : entityCode || Object.keys(GLOBAL_CONSTANTS.cogoport_entities)[2],
				},
			});
			setStatsData(resp?.data);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
				setStatsData({});
			}
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
