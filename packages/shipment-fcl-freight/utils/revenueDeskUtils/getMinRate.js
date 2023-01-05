const getMinRate = (rates) => {
	let minimumRate = null;

	let currency = null;

	let is_rate_expired = null;

	if (rates.length) {
		let min = rates[0]?.price;

		currency = rates[0]?.currency;

		is_rate_expired = rates[0]?.is_rate_expired;

		rates.forEach((rate) => {
			if (rate?.price < min) {
				min = rate?.price;
				currency = rate?.currency;
				is_rate_expired = rate?.is_rate_expired;
			}
		});

		minimumRate = min;
	}
	return { minimumRate, currency, is_rate_expired };
};

export default getMinRate;
