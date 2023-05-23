const getBreakdown = (rate) => {
	const list = [
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
	];

	const rates = Object.keys(rate?.service_rates || {}).map((id) => ({
		...rate?.service_rates[id],
		id,
	}));

	list.push(...rates);

	const totalPrice = {
		total_price            : rate?.total_price,
		total_price_discounted : rate?.total_price,
		currency               : rate?.total_price_currency,
	};

	const pushRate = (data, name, prefix = 'total') => {
		if (data) {
			const obj = {
				total_price            : data[`${prefix}_price`],
				total_price_discounted : data[`${prefix}_price_discounted`],
				currency               : data?.currency,
				line_items             : [
					{
						name                   : name || data.name,
						total_price            : data[`${prefix}_price`],
						total_price_discounted : data[`${prefix}_price_discounted`],
						currency               : data?.currency,
						quantity               : data?.quantity,
						unit                   : data?.unit,
						informations           : data?.informations || [],
						price                  : data?.price,
						price_discounted       : data?.price_discounted,
					},
				],
				title: name || data?.name,
			};
			list.push(obj);
		}
	};

	pushRate(totalPrice, 'Total Price', 'price');

	return list;
};

export default getBreakdown;
