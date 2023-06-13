const CONTAINERS_FIRST = 0;

export const formmatedValues = (initialValues) => {
	const FORMAT_VALUES = {};

	Object.keys(initialValues || {}).forEach((key) => {
		if (key === 'containers') {
			const obj = initialValues.containers?.[CONTAINERS_FIRST] || {};

			Object.keys(obj || {}).forEach((val) => {
				FORMAT_VALUES[val] = obj[val];
			});
		}

		if (key === 'shipment_details') {
			const obj = initialValues.shipment_details || {};

			Object.keys(obj || {}).forEach((val) => {
				FORMAT_VALUES[val] = obj[val];
			});
		} else {
			FORMAT_VALUES[key] = initialValues?.[key];
		}
	});

	return FORMAT_VALUES;
};
