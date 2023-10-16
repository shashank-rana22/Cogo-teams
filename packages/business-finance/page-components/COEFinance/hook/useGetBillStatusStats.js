import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { subtractDays, format } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const NUMBER_OF_DAYS = 7;

const STATUS_MAPPING = {
	coe_rejected : 'COE_REJECTED',
	coe_on_hold  : 'ON_HOLD',
};

const useGetBillStatusStats = ({ date = new Date(), subActiveTabReject = '' }) => {
	const [{ data = [], loading = false }, trigger] = useRequestBf(
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
				const endDate = date || new Date();

				const startDate = new Date(subtractDays(endDate, NUMBER_OF_DAYS));
				const 	payload = {
					fromDate : format(startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
					toDate   : format(endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
				};

				try {
					await trigger({
						params: {
							...payload,
							status: STATUS_MAPPING[subActiveTabReject],
						},
					});
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [trigger, date, subActiveTabReject]);

	useEffect(() => {
		getData();
	}, [getData]);

	return { data, loading };
};

export default useGetBillStatusStats;
