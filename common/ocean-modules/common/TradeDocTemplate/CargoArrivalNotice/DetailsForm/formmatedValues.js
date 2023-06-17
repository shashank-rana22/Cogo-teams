import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const formmatedValues = (initialValues) => {
	const FORMAT_VALUES = {};

	Object.keys(initialValues || {}).forEach((key) => {
		if (key === 'containers') {
			const obj = initialValues.containers?.[GLOBAL_CONSTANTS.zeroth_index] || {};

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
