const getInternalPocData = (data = []) => {
	const format_data = { shipment: [] };

	data.forEach((item) => {
		if (item?.service_type) {
			if (!Object.keys(format_data)?.includes(item.service_type)) {
				format_data[item.service_type] = [item];
			} else { format_data[item.service_type].push(item); }
		} else {
			format_data.shipment.push(item);
		}
	});

	return format_data;
};

export default getInternalPocData;
