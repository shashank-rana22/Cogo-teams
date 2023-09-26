import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { subtractDays, format } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const NUMBER_OF_DAYS = 7;

const useGetBillStatusStats = (date) => {
	const [{ data = [] }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/bill-status-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_bill_status_stats',
		},
		{ autoCancel: false },
	);
	const getData = useCallback(() => {
		(
			async () => {
				const startDate = subtractDays(date, NUMBER_OF_DAYS);
				const 	payload = {
					fromDate : format(startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
					toDate   : format(date, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
				};

				try {
					await trigger({
						params: payload,
					});
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [trigger, date]);

	useEffect(() => {
		getData();
	}, [date, getData]);

	return { data };
};

export default useGetBillStatusStats;
