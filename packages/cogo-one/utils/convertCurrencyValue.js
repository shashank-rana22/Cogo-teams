// export const convertCurrencyValue = (
// 	value,
// 	fromCurrency,
// 	toCurrency,
// 	conversions,
// ) => {
// 	const {
// 		base_currency,
// 		currencies,
// 		currency_conversion_delta = 0.04,
// 	} = conversions || {};
// 	const fxFees = 1 + currency_conversion_delta;
// 	if (fromCurrency === toCurrency) {
// 		return value;
// 	}
// 	if (base_currency === fromCurrency) {
// 		return (value / currencies[toCurrency]) * fxFees;
// 	}
// 	const inBase = value * currencies[fromCurrency];
// 	return (inBase / currencies[toCurrency]) * fxFees;
// };
