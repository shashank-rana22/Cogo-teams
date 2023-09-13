const getCombinedServiceDetails = (details, rates) => {
	let finalDetails = {};

	Object.entries(details).forEach(([serviceId, serviceObj]) => {
		finalDetails = {
			...finalDetails,
			[serviceId]: { ...rates[serviceId], ...serviceObj },
		};
	});

	return finalDetails;
};
export default getCombinedServiceDetails;
