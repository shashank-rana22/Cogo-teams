const getInternalPocData = (data = []) => {
	const formatData = { shipment: [] };

	data.forEach((item) => {
		if (item?.service_type) {
			if (!Object.keys(formatData)?.includes(item.service_type)) {
				formatData[item.service_type] = [item];
			} else { formatData[item.service_type].push(item); }
		} else {
			formatData.shipment.push(item);
		}
	});

	return formatData;
};

export default getInternalPocData;
