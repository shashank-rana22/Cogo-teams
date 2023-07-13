import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback, useMemo } from 'react';

import { getFormatDate } from '../utils/getFormatDate';

const usePurchaseViewStats = ({ filters }) => {
	const [{ loading: statsLoading, data: statsData }, statsTrigger] = useRequestBf(
		{
			url     : '/purchase/bills/stats',
			method  : 'get',
			authKey : 'get_purchase_bills_stats',
		},
		{ autoCancel: false },
	);
	const [{ loading: statsCOEApprovedLoading, data: statsCOEApprovedData }, Trigger] = useRequestBf(
		{
			url     : '/purchase/bills/bill-accept-by-finance-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_bill_accept_by_finance_stats',
		},
		{ manual: true },
	);

	const { serviceType, dateRange, timePeriod } = filters || {};
	const { startDate, endDate } = dateRange || {};

	const billDatesStart = 	getFormatDate(startDate);
	const billDatesEnd = 	getFormatDate(endDate);

	const Payload = useMemo(
		() => ({
			jobTypeShipment : 'true',
			service         : serviceType || undefined,
			fromDate        : billDatesStart || undefined,
			toDate          : billDatesEnd || undefined,
			timePeriod      : timePeriod || undefined,
		}),
		[billDatesEnd, billDatesStart, serviceType, timePeriod],
	);
	const getStatsData = useCallback(() => {
		try {
			statsTrigger({
				params: Payload,
			});
		} catch (err) {
			Toast.error('stats data not present');
		}
	}, [statsTrigger, Payload]);

	const getCOEAprrovedData = useCallback(() => {
		try {
			Trigger({
				params: Payload,
			});
		} catch (err) {
			Toast.error('stats data not present');
		}
	}, [Trigger, Payload]);

	useEffect(() => {
		getStatsData();
		getCOEAprrovedData();
	}, [getStatsData, getCOEAprrovedData]);

	return {
		statsLoading,
		statsData,
		getStatsData,
		statsCOEApprovedLoading,
		statsCOEApprovedData,
	};
};

export default usePurchaseViewStats;
