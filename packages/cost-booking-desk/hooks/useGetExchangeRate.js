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

	const apiTrigger = useCallback(() => {
		try {
			if (ledger_currency) {
				trigger({
					params: getParams({ ledger_currency, currency }),
				});
			}
		} catch (err) {
			toastApiError(err);
		}
	}, [currency, trigger, ledger_currency]);

	useEffect(() => {
		if (ledger_currency) {
			apiTrigger();
		}

		if (data) {
			setValue('exchange_rate', data);
		}
	}, [setValue, apiTrigger, data, ledger_currency]);

	return {
		exchangeRateApiData : data,
		exchangeRateloading : loading,
	};
};

export default useGetExchangeRate;
