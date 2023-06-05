const getSupplierPrefrencePayload = ({
	currentRates,
	systemRates,
	prefrences,
}) => {
	const service_providers = [];

	(prefrences || []).forEach((prefrence, index) => {
		const object = {};

		let searchItems = currentRates;

		if (prefrence?.key === 'system') {
			searchItems = systemRates;
		}

		const foundPrefrence = (searchItems || []).find(
			(obj) => obj?.id === prefrence?.id,
		);
		if (foundPrefrence) {
			object.rate_id = foundPrefrence?.id;
			object.id = foundPrefrence?.service_provider?.id;
		}
		object.priority = index + 1;
		service_providers.push(object);
	});

	return { service_providers };
};
export default getSupplierPrefrencePayload;
