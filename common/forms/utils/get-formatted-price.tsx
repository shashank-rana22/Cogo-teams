const getFormattedPrice = (locale = 'en-IN', price: any, currency: any, options = {}) => (currency
	? Number(price || 0).toLocaleString(locale, {
		style           : 'currency',
		currency,
		currencyDisplay : 'code',
		...options,
	})
	: null);
export default getFormattedPrice;
