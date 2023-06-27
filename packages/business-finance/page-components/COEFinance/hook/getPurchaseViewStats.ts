import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback, useMemo } from 'react';

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
		{ autoCancel: false },
	);

	const { zone, serviceType, dateRange, timePeriod } = filters || {};
	const { startDate, endDate } = dateRange || {};

	const billDatesStart = 			formatDate({
		date       : startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});

	const billDatesEnd = 	formatDate({
		date       : endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});
	const Payload = useMemo(
		() => ({
			jobTypeShipment : 'false',
			zone            : zone || undefined,
			service         : serviceType || undefined,
			fromDate        : billDatesStart || undefined,
			toDate          : billDatesEnd || undefined,
			timePeriod      : timePeriod || undefined,
		}),
		[billDatesEnd, billDatesStart, serviceType, timePeriod, zone],
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
