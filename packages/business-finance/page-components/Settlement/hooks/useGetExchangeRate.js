import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { transactionDates } from './helper';

const useGetExchangeRate = ({ setValue, from_cur, to_cur, exchange_date }) => {
	const [{ loading:exchangeLoading }, exRateTrigger] = useRequestBf(
		{
			url     : 'payments/invoice/exchange-rates',
			method  : 'post',
			authKey : 'post_payments_invoice_exchange_rates',
			data    : {
				from_curr     : from_cur,
				to_curr       : to_cur,
				exchange_date : transactionDates(exchange_date),
			},
		},
		{ manual: true },
	);
	const getExchangeRate = useCallback(async () => {
		try {
			const exData = await exRateTrigger({});
			setValue('exchangeRate', exData?.data?.exchange_rate.toFixed(4));
		} catch (error) {
			Toast.error(error?.data?.response?.message || 'Something went wrong');
		}
	}, [exRateTrigger, setValue]);

	return { exRateTrigger, getExchangeRate, exchangeLoading };
};

export default useGetExchangeRate;
