const getServiceProviderData = (service_data = []) => {
	const SERVICE_PROVIDERS = {};
	service_data?.forEach((item) => {
		const cond = Object.keys(SERVICE_PROVIDERS)?.includes(item?.service_provider_id);

		if (!cond) {
			SERVICE_PROVIDERS[item?.service_provider?.id] = item?.service_provider?.business_name;
		}
	});

	return SERVICE_PROVIDERS;
};

export default getServiceProviderData;
