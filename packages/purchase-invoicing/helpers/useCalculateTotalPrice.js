/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useCalculateTotalPrice = ({ baseCurrency, lineItems, chargeCodes }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/get_all_exchange_rates',
		method : 'get',
	}, { manual: true });

	const getExchangeRates = async () => {
		trigger({ params: { base_currency: baseCurrency } });
	};

	const calculatePrices = () => {
		let invoice_amount = 0;
		let sub_total_amount = 0;
		let total_tax_amount = 0;
		const newItems = (lineItems || []).map((lineItem) => {
			const total = Number(lineItem.rate || 0) * Number(lineItem.quantity || 0);
			const tax_total = (total * (chargeCodes[lineItem.code]?.tax_percent || 0)) / 100;
			const cost = (total || 0) + (tax_total || 0);
			const subtotal_cost_in_invoice_currency = total * (lineItem.exchange_rate
                || data?.[lineItem.currency] || 1);
			const total_cost_in_invoice_currency = cost * (lineItem.exchange_rate || data?.[lineItem.currency] || 1);
			const total_tax_in_invoice_currency = tax_total * (lineItem.exchange_rate
                || data?.[lineItem.currency] || 1);
			sub_total_amount += subtotal_cost_in_invoice_currency;
			invoice_amount += total_cost_in_invoice_currency;
			total_tax_amount += total_tax_in_invoice_currency;
			return {
				...lineItem,
				tax_amt       : tax_total,
				cost,
				exchange_rate : lineItem.exchange_rate || data?.[lineItem.currency] || 1,
			};
		});

		return {
			newItems,
			invoice_amount,
			sub_total_amount,
			total_tax_amount,
		};
	};

	const calculatedValues = calculatePrices();

	useEffect(() => {
		if (baseCurrency) {
			getExchangeRates();
		}
	}, [baseCurrency]);

	return calculatedValues;
};

export default useCalculateTotalPrice;
