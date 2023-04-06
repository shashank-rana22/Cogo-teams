const getAmountLineChartInLakh = (value:number) => {
	const val = value;

	let formatedAmount = '';

	if (val >= 10000000) {
		formatedAmount = `${(val / 10000000).toFixed(2)} Cr`;
	} else if (val >= 100000) {
		formatedAmount = `${(val / 100000).toFixed(2)} Lac`;
	} else if (val >= 1000) {
		formatedAmount = `${(val / 1000).toFixed(2)} K`;
	}

	return ` ${formatedAmount}`;
};

export { getAmountLineChartInLakh };
