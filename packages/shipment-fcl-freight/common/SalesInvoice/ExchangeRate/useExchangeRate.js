import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useContext, useEffect } from 'react';

const useExchangeRate = ({ shipment_id, invoiceCurrency }) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const [serviceCharges, setServiceCharges] = useState([]);
	const [{ loading }, { trigger: getShipmentQuotation }] = useRequest({
		url    : 'get_shipment_quotation',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		(async () => {
			try {
				const res = await getShipmentQuotation({
					params: { shipment_id: shipment_data.id },
				});
				if (!res.hasError) {
					setServiceCharges(res?.data?.service_charges);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const params = { filters: { shipment_id } };
	const [{ data }, trigger] = useRequest({
		url    : 'list_shipment_currency_conversions',
		method : 'POST',
		params,
	}, { manual: true });

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

	const exchangeRateApiData = data?.list?.[0];

	const allCurrenciesWithConversionFactor = exchangeRateApiData?.currency_conversion_rate?.currencies;

	const updatedCurrencyConversionRate = exchangeRateApiData?.updated_currency_conversion_rate;

	const currency_conversion_delta = exchangeRateApiData?.currency_conversion_rate?.currency_conversion_delta;

	const availableCurrencyConversions = {};

	Object.keys(allCurrenciesWithConversionFactor || {})?.forEach((currency) => {
		if (differentCurrenciesHash[currency]) {
			availableCurrencyConversions[currency] =				allCurrenciesWithConversionFactor[currency]
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

	const [{ trigger: rateAddtionApi }] = useRequest({
		url    : '/update_shipment_currency_conversion',
		method : 'POST',
	}, { manual: true });

	return {
		rateAddtionApi,
		differentCurrenciesHash,
		availableCurrencyConversions,
	};
};

export default useExchangeRate;
