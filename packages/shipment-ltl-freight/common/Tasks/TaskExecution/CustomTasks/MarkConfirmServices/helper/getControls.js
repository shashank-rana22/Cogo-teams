const service_provider = {
	name           : 'service_provider_id',
	type           : 'select',
	label          : 'Service Provider',
	span           : 5,
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

	service_provider.value =		subsidiary_service_rendered?.service_provider?.id
		|| service_rendered?.[0]?.service_provider_id
		|| '';

	const controls = [];

	controls.push(service_provider);

	return controls;
};
export default getControls;
