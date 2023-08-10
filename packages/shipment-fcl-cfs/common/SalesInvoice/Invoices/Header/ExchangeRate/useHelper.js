import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetShipmentQuotation from '../../../../../hooks/useGetShipmentQuotation';
import useListCurrencyConversion from '../../../../../hooks/useListCurrencyConversion';
import useUpdateCurrencyConversion from '../../../../../hooks/useUpdateCurrencyConversion';

const OFFSET_VALUE = 1;

const useHelper = ({ invoiceCurrency = '', refetch = () => {}, shipment_id = '' }) => {
	const { currencyConversionData } = useListCurrencyConversion({ shipment_id });
	const { quotationData } = useGetShipmentQuotation({ shipment_id });
	const { handleFormSubmit, loading } = useUpdateCurrencyConversion({ shipment_id, refetch });

	const DIFFERENT_CURRENCIES_HASH = {};
	const OBJ = {};
	const AVAILABLE_CURRENCY_CONVERSIONS = {};

	(quotationData?.service_charges || []).forEach((service) => {
		(service?.line_items || [])?.forEach((line_item) => {
			if (!OBJ[line_item?.currency] && line_item?.currency !== invoiceCurrency) {
				DIFFERENT_CURRENCIES_HASH[line_item?.currency] = {
					from_currency : line_item?.currency,
					to_currency   : invoiceCurrency,
				};
			}
			OBJ[line_item?.currency] = true;
		});
	});

	const exchangeRateApiData = currencyConversionData?.[GLOBAL_CONSTANTS.zeroth_index];
	const allCurrenciesWithConversionFactor = exchangeRateApiData?.currency_conversion_rate?.currencies;
	const updatedCurrencyConversionRate = exchangeRateApiData?.updated_currency_conversion_rate;
	const currency_conversion_delta = exchangeRateApiData?.updated_currency_conversion_rate?.currency_conversion_delta;

	Object.keys(allCurrenciesWithConversionFactor || {})?.forEach((currency) => {
		if (DIFFERENT_CURRENCIES_HASH[currency]) {
			AVAILABLE_CURRENCY_CONVERSIONS[currency] = allCurrenciesWithConversionFactor[currency]
					* (OFFSET_VALUE + currency_conversion_delta);
		}
	});
	Object.keys(AVAILABLE_CURRENCY_CONVERSIONS || {})?.forEach((currency) => {
		if (invoiceCurrency === updatedCurrencyConversionRate?.base_currency) {
			Object.keys(updatedCurrencyConversionRate?.currencies || {})?.forEach(
				(updatedCurrency) => {
					if (currency === updatedCurrency) {
						AVAILABLE_CURRENCY_CONVERSIONS[currency] = updatedCurrencyConversionRate
							?.currencies[updatedCurrency];
					}
				},
			);
		}
	});

	return {
		handleFormSubmit,
		DIFFERENT_CURRENCIES_HASH,
		AVAILABLE_CURRENCY_CONVERSIONS,
		loading,
	};
};

export default useHelper;
