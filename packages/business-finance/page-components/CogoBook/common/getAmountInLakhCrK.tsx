const getAmountInLakhCrK = (value:number, currency:string) => {
	let formatedAmount = '';

	if (value >= 10000000) {
		formatedAmount = `${(value / 10000000).toFixed(2)} Cr`;
	} else if (value >= 100000) {
		formatedAmount = `${(value / 100000).toFixed(2)} Lac`;
	} else if (value >= 1000) {
		formatedAmount = `${(value / 1000).toFixed(2)} K`;
	} else if (value === 0) {
		formatedAmount = `${(value).toFixed(2)}`;
	} else if (value <= (10000000 * -1)) {
		formatedAmount = `${(value / 10000000).toFixed(2)} Cr`;
	} else if (value <= (100000 * -1)) {
		formatedAmount = `${(value / 100000).toFixed(2)}Lac`;
	} else if (value <= (1000 * -1)) {
		formatedAmount = `${(value / 1000).toFixed(2)} K`;
	}

	return `${currency} ${formatedAmount}`;
};

export { getAmountInLakhCrK };
