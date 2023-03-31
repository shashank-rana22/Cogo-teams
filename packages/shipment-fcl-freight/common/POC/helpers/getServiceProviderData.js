const getServiceProviderData = (service_data = []) => {
	const service_providers = {};
	service_data?.forEach((item) => {
		const cond = Object.keys(service_providers)?.includes(item?.service_provider_id);
		if (!cond) {
			service_providers[item?.service_provider?.id] = item?.service_provider?.business_name;
		}
	});

	return service_providers;
};

export default getServiceProviderData;
