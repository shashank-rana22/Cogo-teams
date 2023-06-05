import useGetShipmentQuotation from '../../../../../hooks/useGetShipmentQuotation';
import useListCurrencyConversion from '../../../../../hooks/useListCurrencyConversion';
import useUpdateCurrencyConversion from '../../../../../hooks/useUpdateCurrencyConversion';

const Helper = ({ invoiceCurrency = '', refetch = () => {}, shipment_id = '' }) => {
	const { currencyConversionData } = useListCurrencyConversion({ shipment_id });
	const { quotationData } = useGetShipmentQuotation({ shipment_id });
	const { handleFormSubmit, loading } = useUpdateCurrencyConversion({ shipment_id, refetch });

	const differentCurrenciesHash = {};
	const obj = {};
	const availableCurrencyConversions = {};

	(quotationData?.service_charges || []).forEach((service) => {
		(service?.line_items || [])?.forEach((line_item) => {
			if (!obj[line_item?.currency] && line_item?.currency !== invoiceCurrency) {
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
	const currency_conversion_delta = exchangeRateApiData?.updated_currency_conversion_rate?.currency_conversion_delta;

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
		handleFormSubmit,
		differentCurrenciesHash,
		availableCurrencyConversions,
		loading,
	};
};

export default Helper;
