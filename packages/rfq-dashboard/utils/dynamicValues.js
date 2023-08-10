import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const convertCurrencyValue = (
	value,
	fromCurrency,
	toCurrency,
	conversions,
) => {
	const {
		base_currency,
		currencies,
		currency_conversion_delta = GLOBAL_CONSTANTS.currency_conversion_constant,
	} = conversions || {};

	const fxFees = 1 + currency_conversion_delta;
	if (fromCurrency === toCurrency) {
		return value;
	}
	if (base_currency === fromCurrency) {
		return (value / (currencies?.[toCurrency] || 1)) * fxFees;
	}
	const inBase = value * (currencies?.[fromCurrency] || 0);
	return (inBase / (currencies?.[toCurrency] || 1)) * fxFees;
};

const calculateLineItemTotal = (lineItem, toCurrency, conversions) => {
	if (lineItem.source === 'manual') {
		return 0;
	}

	const temp = (lineItem?.total_price_discounted || 0)
	+ Number((lineItem?.credit_amount || 0) * (lineItem?.quantity || 0) || 0);

	return convertCurrencyValue(temp, lineItem?.currency, toCurrency, conversions);
};

export const displayTotal = ({
	lineItems,
	editedMargins,
	conversions,
	toCurrency,
}) => {
	let total = 0;

	(lineItems || []).forEach((lineItem) => {
		total += calculateLineItemTotal(lineItem, toCurrency, conversions);
	});

	editedMargins?.forEach((editedMargin) => {
		const matchingLineItems = (lineItems || []).filter(
			(lineItem) => editedMargin.code === lineItem.code,
		);
		const { margins = [] } = matchingLineItems[0] || {};
		const predefinedMargin = (margins || []).find(
			(item) => item?.margin_type === 'demand',
		);
		const { total_margin_value = 0 } = predefinedMargin || {};

		let temp = 0;
		if (editedMargin.type === 'absolute_unit') {
			temp = (editedMargin.value || 0) * (matchingLineItems[0]?.quantity || 0) - total_margin_value;
		} else if (editedMargin.type === 'absolute_total') {
			temp = editedMargin.value - total_margin_value;
		}

		total += convertCurrencyValue(
			temp,
			editedMargin.currency,
			toCurrency,
			conversions,
		);
	});

	return total;
};

export const displayMarginValue = (value, { lineItem, editedMargin }) => {
	if (!editedMargin) {
		return value;
	}
	let derivedMarginValue = value;
	if (editedMargin?.type === 'absolute_unit') {
		derivedMarginValue = (lineItem?.quantity || 1) * (editedMargin?.value || 0);
	} else if (editedMargin?.type === 'absolute_total') {
		derivedMarginValue = editedMargin?.value || 0;
	}
	return derivedMarginValue;
};
