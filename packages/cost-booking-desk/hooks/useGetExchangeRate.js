import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({
	ledger_currency = '',
	currency = 'INR',
}) => ({
	from_currency : currency,
	to_currency   : ledger_currency,
	exchange_date : Date.now(),
});

const useGetExchangeRate = ({
	billingParty = {},
	formValues = {},
	setValue = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_exchange_rate',
		method : 'GET',
	}, { manual: true });

	const { currency = '' } = formValues || {};
	const { ledger_currency = '' } = billingParty || {};

	const apiTrigger = useCallback(async () => {
		try {
			if (ledger_currency) {
				const res = await trigger({
					params: getParams({ ledger_currency, currency }),
				});
				if (res?.data) setValue('exchange_rate', data);
			}
		} catch (err) {
			toastApiError(err);
		}
	}, [ledger_currency, trigger, currency, setValue, data]);

	useEffect(() => {
		if (ledger_currency) {
			apiTrigger();
		}
	}, [setValue, apiTrigger, data, ledger_currency]);

	return {
		exchangeRateApiData : data,
		exchangeRateloading : loading,
	};
};

export default useGetExchangeRate;
