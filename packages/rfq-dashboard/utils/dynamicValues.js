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

export const displayTotal = ({
	lineItems,
	editedMargins,
	conversions,
	toCurrency,

}) => {
	let total = 0;

	(lineItems || []).forEach((line_item) => {
		if (line_item.source !== 'manual') {
			total += convertCurrencyValue(
				line_item?.total_buy_price === 0
					? line_item?.total_price_discounted
					: (line_item?.total_price_discounted || 0)
							+ Number((line_item?.credit_amount || 0) * (line_item?.quantity || 0) || 0),
				line_item?.currency,
				toCurrency,
				conversions,
			);
		}
	});

	editedMargins?.forEach((editedMargin) => {
		if (editedMargin.type === 'absolute_unit') {
			(lineItems || [])?.forEach((lineItem) => {
				const { margins = [] } = lineItem;

				const predefined_margin = (margins || []).find(
					(item) => item?.margin_type === 'demand',
				);
				const { total_margin_value = 0 } = predefined_margin || {};

				if (editedMargin.code === lineItem.code) {
					const temp =						(editedMargin.value || 0) * (lineItem?.quantity || 0)
						- (lineItem.source !== 'manual' ? total_margin_value : 0);

					total += convertCurrencyValue(
						temp,
						editedMargin.currency,
						toCurrency,
						conversions,
					);
				}
			});
		}

		if (editedMargin.type === 'absolute_total') {
			(lineItems || []).forEach((lineItem) => {
				const { margins = [] } = lineItem;

				const predefined_margin = (margins || []).find(
					(item) => item?.margin_type === 'demand',
				);
				const { total_margin_value = 0 } = predefined_margin || {};

				if (editedMargin.code === lineItem.code) {
					const temp =						editedMargin.value
						- (lineItem.source !== 'manual' ? total_margin_value : 0);
					total += convertCurrencyValue(
						temp,
						editedMargin.currency,
						toCurrency,
						conversions,
					);
				}
			});
		}
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
