const currencyCoversion = (isDollar, amount) => {
	let covertedPrice = amount;

	if (isDollar === 'INR') {
		covertedPrice = amount * 79;
	}

	return covertedPrice;
};

export default currencyCoversion;
