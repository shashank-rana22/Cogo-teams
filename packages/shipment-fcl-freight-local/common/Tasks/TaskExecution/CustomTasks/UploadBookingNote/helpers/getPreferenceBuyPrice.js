const getPreferenceBuyPrice = (data, source) => {
	if (source === 'system_rate') {
		const price = data?.validities?.[0]?.price;
		const currency = data?.validities?.[0]?.currency;
		return `${currency} ${price}`;
	}

	if (source === 'flash_booking') {
		const price = data?.line_items?.[0]?.price;
		const currency = data?.line_items?.[0]?.currency;
		return `${currency} ${price}`;
	}

	const price = data?.charges?.line_items?.[0]?.price;
	const currency = data?.charges?.line_items?.[0]?.currency;
	return `${currency} ${price}`;
};

export default getPreferenceBuyPrice;
