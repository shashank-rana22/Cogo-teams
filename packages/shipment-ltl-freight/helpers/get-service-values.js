const findValue = (name, trade_type, detail) => {
	let value = null;

	const services = Object.values(detail?.service_details || {});

	for (let i = 0; i < services?.length; i += 1) {
		const item = services?.[i] || {};

		if (value) return value;

		if (!item?.trade_type || trade_type === item?.trade_type) {
			if (trade_type === 'export') {
				value = item?.[name] || item?.[`origin_${name}`];
			}

			if (trade_type === 'import') {
				value = item?.[name] || item?.[`destination_${name}`];
			} else {
				value = item?.[name];
			}
		}
	}

	return '';
};

const getServiceValues = (service, controls, detail) => {
	let trade_type = service?.trade_type;

	if (service?.is_main) trade_type = null;

	const prefilledValues = {};

	controls?.forEach((item) => {
		const names = item?.name?.split(`${service?.service}_`);

		const name = names?.[1] || names?.[0];

		const value = findValue(name, trade_type, detail);

		if (value) prefilledValues[item?.name] = value;
	});

	return prefilledValues;
};

export default getServiceValues;
