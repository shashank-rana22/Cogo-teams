import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import { transactionDates } from './helper';

const useExchangeRate = ({ paymentDateValue, fromCur, toCur, setValue }) => {
	const [{ loading:exchangeLoading }, exRateTrigger] = useRequest(
		{
			url    : 'payments/invoice/exchange-rates',
			method : 'post',
			data   : {
				from_curr     : fromCur,
				to_curr       : toCur,
				exchange_date : transactionDates(paymentDateValue),
			},
		},
		{ manual: true },
	);
	const exchangeApi = useCallback(async () => {
		try {
			const exData = await exRateTrigger({});
			setValue('exchangeRate', exData?.data?.exchange_rate.toFixed(4));
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	}, [exRateTrigger, setValue]);

	return { exRateTrigger, exchangeApi, exchangeLoading };
};
export default useExchangeRate;
