export const formmatedValues = (initialValues) => {
	const formatValues = {};

	Object.keys(initialValues || {}).forEach((key) => {
		if (key === 'containers') {
			const obj = initialValues.containers?.[0] || {};

			Object.keys(obj || {}).forEach((val) => {
				formatValues[val] = obj[val];
			});
		}

		if (key === 'shipment_details') {
			const obj = initialValues.shipment_details || {};

			Object.keys(obj || {}).forEach((val) => {
				formatValues[val] = obj[val];
			});
		} else {
			formatValues[key] = initialValues?.[key];
		}
	});

	return formatValues;
};
