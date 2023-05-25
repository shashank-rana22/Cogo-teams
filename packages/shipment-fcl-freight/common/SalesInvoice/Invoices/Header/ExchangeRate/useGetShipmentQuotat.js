import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useListCurrencyConversion from './useListCurrencyConversion';

const useGetShipmentQuotation = ({ invoiceCurrency }) => {
	const { getCurrencyConversion } = useListCurrencyConversion();
	const {
		data,
		serviceCharges,
	} = useGetShipmentQuotation();

	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const obj = {};
	const differentCurrenciesHash = {};
	(serviceCharges || []).forEach((service) => {
		(service?.line_items || [])?.forEach((line_item) => {
			if (
				!obj[line_item?.currency]
				&& line_item?.currency !== invoiceCurrency
			) {
				differentCurrenciesHash[line_item?.currency] = {
					from_currency : line_item?.currency,
					to_currency   : invoiceCurrency,
				};
			}
			obj[line_item?.currency] = true;
		});
	});

	const exchangeRateApiData = getCurrencyConversion?.data?.list?.[0];
	const allCurrenciesWithConversionFactor = exchangeRateApiData?.currency_conversion_rate?.currencies;
	const updatedCurrencyConversionRate = exchangeRateApiData?.updated_currency_conversion_rate;
	const currency_conversion_delta = exchangeRateApiData?.currency_conversion_rate?.currency_conversion_delta;

	const availableCurrencyConversions = {};

	Object.keys(allCurrenciesWithConversionFactor || {})?.forEach((currency) => {
		if (differentCurrenciesHash[currency]) {
			availableCurrencyConversions[currency] = allCurrenciesWithConversionFactor[currency]
				* (1 + currency_conversion_delta);
		}
	});

	Object.keys(availableCurrencyConversions || {})?.forEach((currency) => {
		if (invoiceCurrency === updatedCurrencyConversionRate?.base_currency) {
			Object.keys(updatedCurrencyConversionRate?.currencies || {})?.forEach(
				(updatedCurrency) => {
					if (currency === updatedCurrency) {
						availableCurrencyConversions[currency] = updatedCurrencyConversionRate
							?.currencies[updatedCurrency];
					}
				},
			);
		}
	});

	const rateAddtionApi = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_currency_conversion');

	return {
		rateAddtionApi,
		differentCurrenciesHash,
		availableCurrencyConversions,
	};
};

export default useGetShipmentQuotation;
