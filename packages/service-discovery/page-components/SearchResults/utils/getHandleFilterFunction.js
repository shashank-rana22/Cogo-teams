export const paymentTerm = ({ rateCard, key, filters }) => {
	const newKey = key === 'currency' ? 'total_price_currency' : key;
	if (rateCard[newKey] !== filters[key]) {
		return false;
	}
	return true;
};
