const getLineItemsMappedColor = ({ row = {}, chargesTable = [] }) => {
	const { currency, price, quantity, exchangeRate, sacCode } = row;

	const isMatching = chargesTable?.some((obj) => currency === obj?.currency
    && price === obj?.rate
    && quantity === obj?.quantity
    && exchangeRate === obj?.exchange_rate
    && sacCode === obj?.sac);

	return isMatching ? 'green' : 'auto';
};

export default getLineItemsMappedColor;
