const getShortFormatNumber = (locale, price, currency, options = {}) => (currency
	? Intl.NumberFormat(locale, {
		style                 : 'currency',
		currency,
		notation              : 'compact',
		compactDisplay        : 'short',
		minimumFractionDigits : 2,
		...options,
	}).format(Number(price || 0))
	: null);

export default getShortFormatNumber;
