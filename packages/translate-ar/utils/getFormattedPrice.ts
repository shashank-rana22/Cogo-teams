const getPrice = (price: number, currency: string, options: object = {}, locale: string = 'en-IN') => (currency
	? Number(price || 0).toLocaleString(locale, {
		style           : 'currency',
		currency,
		currencyDisplay : 'code',
		...options,
	})
	: null);

export default getPrice;
