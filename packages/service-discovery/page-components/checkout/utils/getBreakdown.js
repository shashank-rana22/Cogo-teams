const getBreakdown = (rate) => {
	const list = [
		{
			total_price            : rate?.tax_total_price,
			total_price_discounted : rate?.tax_total_price_discounted,
			currency               : rate?.tax_total_price_currency,
			line_items             : [],
			title                  : 'Total landed cost',
			informations           : [],
			price                  : rate?.price,
			price_discounted       : rate?.price_discounted,
			all_sellers            : [],
			service                : '',
		},
	];
	const rates = Object.keys(rate?.services || {}).map((id) => ({
		...rate?.services[id],
		id,
	}));
	list.push(...rates);

	const credit = rate?.credit_rate;
	const tax = {
		tax_price            : rate?.tax_price,
		tax_price_discounted : rate?.tax_price,
		currency             : rate?.tax_price_currency,
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

	pushRate(credit);
	pushRate(tax, 'Total Tax', 'tax');

	return list;
};
export default getBreakdown;
