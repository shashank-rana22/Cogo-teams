import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import { transactionDates } from './helper';

const useExchangeRate = ({ paymentDateValue, fromCur, toCur, setValue }) => {
	const [{ loading:exchangeLoading }, exRateTrigger] = useRequest(
		{
			url    : 'get_exchange_rate',
			method : 'get',
		},
		{ manual: false, autoCancel: false },
	);
	const exchangeApi = useCallback(async () => {
		try {
			const exData = await exRateTrigger({
				params: {
					from_currency : fromCur,
					to_currency   : toCur,
					exchange_date : transactionDates(paymentDateValue),
				},
			});
			setValue('exchangeRate', exData?.data?.toFixed(4));
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	}, [exRateTrigger, fromCur, paymentDateValue, setValue, toCur]);

	return { exRateTrigger, exchangeApi, exchangeLoading };
};
export default useExchangeRate;
