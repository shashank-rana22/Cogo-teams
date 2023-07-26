const getNewServiceType = (service) => {
	if (service?.trade_type === 'export') {
		return `origin_${service?.service_type}`;
	} if (service?.trade_type === 'import') {
		return `destination_${service?.service_type}`;
	}
	return service?.service_type;
};

const getInternalPocData = (data = []) => {
	const format_data = { shipment: [] };

	data.forEach((item) => {
		if (item?.service_type) {
			if (!Object.keys(format_data)?.includes(getNewServiceType(item))) {
				if (item?.trade_type === 'import') {
					format_data[`destination_${item.service_type}`] = [item];
				} else if (item?.trade_type === 'export') {
					format_data[`origin_${item.service_type}`] = [item];
				} else {
					format_data[item.service_type] = [item];
				}
			} else {
				format_data[getNewServiceType(item)]?.push(item);
			}
		} else {
			format_data.shipment.push(item);
		}
	});

	return format_data;
};

export default getInternalPocData;
