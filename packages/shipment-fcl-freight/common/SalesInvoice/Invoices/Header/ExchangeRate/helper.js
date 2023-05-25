import useUpdateCurrencyConversion from './useUpdateCurrencyConversion';

const Helper = ({ currencyConversionData = {}, quotationData = {}, invoiceCurrency = '' }) => {
	const { rateAddtionApi } = useUpdateCurrencyConversion();

	const differentCurrenciesHash = {};
	const obj = {};
	const availableCurrencyConversions = {};
	console.log({ quotationData, currencyConversionData });

	(quotationData?.serviceCharges || []).forEach((service) => {
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

	const exchangeRateApiData = currencyConversionData?.[0];
	const allCurrenciesWithConversionFactor = exchangeRateApiData?.currency_conversion_rate?.currencies;
	const updatedCurrencyConversionRate = exchangeRateApiData?.updated_currency_conversion_rate;
	const currency_conversion_delta = exchangeRateApiData?.currency_conversion_rate?.currency_conversion_delta;

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

	return {
		rateAddtionApi,
		differentCurrenciesHash,
		availableCurrencyConversions,
	};
};

export default Helper;
