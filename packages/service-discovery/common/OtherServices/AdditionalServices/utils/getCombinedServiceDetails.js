const getCombinedServiceDetails = (details, rates) => {
	let finalDetails = {};

	Object.entries(details).forEach(([serviceId, serviceObj]) => {
		finalDetails = {
			...finalDetails,
			[serviceId]: { ...serviceObj, ...rates[serviceId] },
		};
	});

	return finalDetails;
};
export default getCombinedServiceDetails;
