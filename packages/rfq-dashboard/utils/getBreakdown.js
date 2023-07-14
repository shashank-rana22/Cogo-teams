const pushRate = (rate, name, prefix = 'total') => {
	const totalPrice = {
		total_price            : rate?.total_price,
		total_price_discounted : rate?.total_price,
		currency               : rate?.total_price_currency,
	};

	if (!rate) {
		return {};
	}

	return {
		total_price            : totalPrice[`${prefix}_price`],
		total_price_discounted : totalPrice[`${prefix}_price_discounted`],
		currency               : totalPrice?.currency,
		line_items             : [
			{
				name                   : name || totalPrice.name,
				total_price            : totalPrice[`${prefix}_price`],
				total_price_discounted : totalPrice[`${prefix}_price_discounted`],
				currency               : totalPrice?.currency,
				quantity               : totalPrice?.quantity,
				unit                   : totalPrice?.unit,
				informations           : totalPrice?.informations || [],
				price                  : totalPrice?.price,
				price_discounted       : totalPrice?.price_discounted,
			},
		],
		title: name || totalPrice?.name,
	};
};

const getBreakdown = (rate) => {
	const rates = Object.keys(rate?.service_rates || {}).map((id) => ({
		...rate?.service_rates[id],
		id,
	}));

	return [
		{
			total_price            : rate?.total_price,
			total_price_discounted : rate?.total_price_discounted,
			currency               : rate?.total_price_currency,
			line_items             : [],
			title                  : 'Total landed cost',
			informations           : [],
			price                  : rate?.total_price,
			price_discounted       : rate?.total_price_discounted,
			all_sellers            : [],
			service                : '',
		},
		...rates,
		pushRate(rate, 'Total Price', 'price'),
	];
};

export default getBreakdown;
