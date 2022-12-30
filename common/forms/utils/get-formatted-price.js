const getFormattedPrice = (locale = 'en-IN', price, currency, options = {}) => (currency
	? Number(price || 0).toLocaleString(locale, {
		style           : 'currency',
		currency,
		currencyDisplay : 'code',
		...options,
	})
	: null);
export default getFormattedPrice;
