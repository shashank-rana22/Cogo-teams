const getLineItemsMappedColor = ({ row = {}, chargesTable = [] }) => {
	const { currency, price, quantity, exchangeRate, taxAmount, sacCode } = row;

	const isMatching = chargesTable?.some((obj) => currency === obj?.currency
    && price === obj?.rate
    && quantity === obj?.quantity
    && exchangeRate === obj?.exchange_rate
    && (taxAmount === obj?.tax_amount_inr || taxAmount === obj?.taxable_amount_usd)
    && sacCode === obj?.sac);

	return isMatching ? 'green' : 'auto';
};

export default getLineItemsMappedColor;
