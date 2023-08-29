const DEFAULT_TOTAL_MARGIN_VALUE = 0;

const ONE = 1;
const PERCENT_VALUE = 100;

export const convertCurrencyValue = (
	value,
	fromCurrency,
	toCurrency,
	conversions,
) => {
	const {
		base_currency,
		currencies,
		currency_conversion_delta = 0.04,
		cogofx_currencies = {},
	} = conversions || {};

	const fxFees = ONE + currency_conversion_delta;

	if (fromCurrency === toCurrency) {
		return value;
	}

	if (base_currency === fromCurrency) {
		return (value / (currencies[toCurrency] || cogofx_currencies[toCurrency])) * fxFees;
	}

	const inBase = value * (currencies[fromCurrency] || cogofx_currencies[fromCurrency]);

	return (inBase / (currencies[toCurrency] || cogofx_currencies[toCurrency])) * fxFees;
};

export const displayTotal = (
	lineItems,
	editedMargins,
	conversions,
	toCurrency,
) => {
	let total = 0;

	(lineItems || []).forEach((line_item) => {
		const {
			source = '',
			isNew = false,
			total_buy_price = 0,
			total_price_discounted = 0,
			credit_amount = 0,
			quantity = 0,
			currency = '',
		} = line_item;

		if (source !== 'manual' && !isNew) {
			total += convertCurrencyValue(
				!total_buy_price
					? total_price_discounted
					: total_price_discounted + Number(credit_amount * quantity),
				currency,
				toCurrency,
				conversions,
			);
		}
	});

	editedMargins?.forEach((editedMargin) => {
		const { type, isNew = false, value = 0 } = editedMargin || {};

		if (type === 'absolute_unit' && !isNew) {
			const lineItem = (lineItems || []).find((item) => item.code === editedMargin.code);

			const { margins = [], quantity = 0, source = '' } = lineItem;

			const predefined_margin = (margins || []).find(
				(item) => item?.margin_type === 'demand',
			);
			const { total_margin_value = 0 } = predefined_margin || {};

			const temp = value * quantity - (source !== 'manual' ? total_margin_value : DEFAULT_TOTAL_MARGIN_VALUE);

			total += convertCurrencyValue(
				temp,
				editedMargin.currency,
				toCurrency,
				conversions,
			);
		}

		if (type === 'absolute_total' && !editedMargin.isNew) {
			const lineItem = (lineItems || []).find((item) => item.code === editedMargin.code);

			const { margins = [] } = lineItem;

			const predefined_margin = (margins || []).find(
				(item) => item?.margin_type === 'demand',
			);
			const { total_margin_value = 0 } = predefined_margin || {};

			const temp = editedMargin.value
						- (lineItem.source !== 'manual' ? total_margin_value : DEFAULT_TOTAL_MARGIN_VALUE);

			total += convertCurrencyValue(
				temp,
				editedMargin.currency,
				toCurrency,
				conversions,
			);
		}

		if (editedMargin.isNew) {
			total += convertCurrencyValue(
				Number(editedMargin.value),
				editedMargin.currency,
				toCurrency,
				conversions,
			);
		}
	});

	return total;
};

export const displayMarginValue = (value, {
	lineItem = {},
	editedMargin,
	value: PromotionPercentage = 0,
	isautoDiscountApplicable = false,
}) => {
	const { value:finalValue = 0, type = '' } = editedMargin;

	const { quantity = 1 } = lineItem;

	if (!editedMargin) {
		return value;
	}

	let derivedMarginValue = value;

	if (type === 'absolute_unit') {
		derivedMarginValue = quantity * finalValue;
	} else {
		derivedMarginValue = Number(finalValue);
	}

	if (isautoDiscountApplicable) {
		derivedMarginValue *= ONE - PromotionPercentage / PERCENT_VALUE;
	}

	return derivedMarginValue;
};
