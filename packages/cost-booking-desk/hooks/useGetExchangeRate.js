import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const getParams = ({ billingParty = {}, currency = 'INR' }) => {
	const { ledger_currency = '' } = billingParty || {};

	return {
		from_currency : currency,
		to_currency   : ledger_currency,
		exchange_date : Date.now(),
	};
};

const useGetExchangeRate = ({ billingParty = {}, formValues = {} }) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_exchange_rate',
		method : 'GET',
	}, { manual: false });

	const apiTrigger = useCallback(() => async () => {
		try {
			const { currency = '' } = formValues || {};
			const res = await trigger({
				params: getParams({ billingParty, currency }),
			});
			setApiData(res);
		} catch (err) {
			toastApiError(err);
		}
	}, [billingParty, formValues, trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, billingParty]);

	return {
		exchangeRateApiData    : apiData,
		exchangeRateApiTrigger : apiTrigger,
		exchangeRateloading    : loading,
	};
};

export default useGetExchangeRate;
