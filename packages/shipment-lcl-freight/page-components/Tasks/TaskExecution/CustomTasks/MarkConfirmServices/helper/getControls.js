const service_provider = {
	name           : 'lcl_freight_service_service_provider_id',
	type           : 'select',
	label          : 'Service Provider',
	span           : 6,
	optionsListKey : 'verified-service-providers',
	placeholder    : 'Select Service Provider',
	rules          : { required: 'Service Provider is Required' },
};

const service_provider_local = {
	name           : 'lcl_freight_local_service_service_provider_id',
	type           : 'select',
	span           : 6,
	label          : 'Service Provider (Lcl Local)',
	optionsListKey : 'verified-service-providers',
	placeholder    : 'Select Service Provider',
	rules          : { required: 'Service Provider is Required' },

};

const getControls = ({
	service_type = '',
	servicesList = [],
	subsidiaryService = {},
}) => {
	const service_rendered = (servicesList || []).filter(
		(service) => service?.service_type === service_type,
	);

	let subsidiary_service_rendered = {};

	if (service_type === 'subsidiary_service') {
		subsidiary_service_rendered = (service_rendered || []).find(
			(service) => service?.code === subsidiaryService?.code,
		);
	}

	service_provider.value = subsidiary_service_rendered?.service_provider?.id
		|| service_rendered?.[0]?.service_provider_id
		|| '';

	service_provider_local.value =	(servicesList || [])
		.find((serviceObj) => serviceObj?.service_type.includes('lcl_freight_local'))?.service_provider_id;

	const controls = [service_provider, service_provider_local];

	return controls;
};
export default getControls;
