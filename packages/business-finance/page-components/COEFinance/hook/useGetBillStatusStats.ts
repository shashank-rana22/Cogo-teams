import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { addDays, format } from '@cogoport/utils';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetBillStatusStats = (date) => {
	const [{ data = [] }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/bill-status-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_bill_status_stats',
		},
		{ autoCancel: false },
	);
	const getData = async () => {
		let payload;
		if (date) {
			const endDate = addDays(date, 7);
			payload = {
				startData : format(date, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
				endDate   : format(endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']),
			};
		}
		try {
			await trigger({
				params: payload,
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date]);

	return { data };
};

export default useGetBillStatusStats;
