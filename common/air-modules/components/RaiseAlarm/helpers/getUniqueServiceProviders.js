const getUnique = (serviceProviderList) => {
	const FLAG = {};
	const UNIQUE_SERVICE_PROVIDER = [];
	(serviceProviderList || []).forEach((item) => {
		if (!FLAG[item?.service_provider_id]) {
			FLAG[item?.service_provider_id] = true;
			UNIQUE_SERVICE_PROVIDER.push(item);
		}
	});
	return UNIQUE_SERVICE_PROVIDER;
};

export default getUnique;
