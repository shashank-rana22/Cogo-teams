import useGetShipmentQuotation from '../../../../../hooks/useGetShipmentQuotation';
import useListCurrencyConversion from '../../../../../hooks/useListCurrencyConversion';
import useUpdateCurrencyConversion from '../../../../../hooks/useUpdateCurrencyConversion';

const INITIAL_STATE = 0;
const CURRENCY_CONVERSION_FACTOR = 1;
const DIFFERENT_CURRENCIES_HASH = {};
const LINE_ITEMS = {};
const AVAILABLE_CURRENCY_CONVERSION = {};

const useHelper = ({ invoiceCurrency = '', refetch = () => {} }) => {
	const { currencyConversionData } = useListCurrencyConversion();
	const { quotationData } = useGetShipmentQuotation({ invoiceCurrency });
	const { handleFormSubmit, loading } = useUpdateCurrencyConversion({ refetch });

	(quotationData?.service_charges || []).forEach((service) => {
		(service?.line_items || [])?.forEach((line_item) => {
			if (!LINE_ITEMS[line_item?.currency] && line_item?.currency !== invoiceCurrency) {
				DIFFERENT_CURRENCIES_HASH[line_item?.currency] = {
					from_currency : line_item?.currency,
					to_currency   : invoiceCurrency,
				};
			}
			LINE_ITEMS[line_item?.currency] = true;
		});
	});

	const exchangeRateApiData = currencyConversionData?.[INITIAL_STATE];
	const allCurrenciesWithConversionFactor = exchangeRateApiData?.currency_conversion_rate?.currencies;
	const updatedCurrencyConversionRate = exchangeRateApiData?.updated_currency_conversion_rate;
	const currency_conversion_delta = exchangeRateApiData?.updated_currency_conversion_rate?.currency_conversion_delta;

	Object.keys(allCurrenciesWithConversionFactor || {})?.forEach((currency) => {
		if (DIFFERENT_CURRENCIES_HASH[currency]) {
			AVAILABLE_CURRENCY_CONVERSION[currency] = allCurrenciesWithConversionFactor[currency]
					* (CURRENCY_CONVERSION_FACTOR + currency_conversion_delta);
		}
	});
	Object.keys(AVAILABLE_CURRENCY_CONVERSION || {})?.forEach((currency) => {
		if (invoiceCurrency === updatedCurrencyConversionRate?.base_currency) {
			Object.keys(updatedCurrencyConversionRate?.currencies || {})?.forEach(
				(updatedCurrency) => {
					if (currency === updatedCurrency) {
						AVAILABLE_CURRENCY_CONVERSION[currency] = updatedCurrencyConversionRate
							?.currencies[updatedCurrency];
					}
				},
			);
		}
	});

	return {
		handleFormSubmit,
		DIFFERENT_CURRENCIES_HASH,
		AVAILABLE_CURRENCY_CONVERSION,
		loading,
	};
};

export default useHelper;
