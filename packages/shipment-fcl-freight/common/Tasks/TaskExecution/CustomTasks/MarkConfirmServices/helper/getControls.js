const shipping_line = {
	name           : 'shipping_line_id',
	label          : 'Shipping Line',
	type           : 'select',
	optionsListKey : 'shipping-lines',
	span           : 5,
	className      : 'primary sm',
	rules          : { required: 'Shipping Line is Required' },
};

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
	const iscarrierHaulage = () => {
		let iscarrier = false;
		(servicesList || []).forEach((service) => {
			if (
				service?.service_type === 'haulage_freight_service'
				&& service?.haulage_type === 'carrier'
			) {
				iscarrier = true;
			}
		});

		return iscarrier;
	};

	const getIds = () => {
		const ids = {
			fcl_shipping_line_id     : '',
			haulage_shipping_line_id : '',
		};

		(servicesList || []).forEach((service) => {
			if (
				service?.service_type === 'haulage_freight_service'
				&& service?.haulage_type === 'carrier'
			) {
				ids.haulage_shipping_line_id = service?.shipping_line_id || '';
			}
			if (service?.service_type === 'fcl_freight_service') {
				ids.fcl_shipping_line_id = service.shipping_line_id || '';
			}
		});
		return ids;
	};

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
	const data = getIds();

	if (['fcl_freight', 'fcl_freight_service'].includes(service_type)) {
		shipping_line.value = data.fcl_shipping_line_id;
		controls.push(shipping_line);
	}

	if (iscarrierHaulage() && service_type === 'haulage_freight_service') {
		shipping_line.value = data.haulage_shipping_line_id;
		controls.push(shipping_line);
	}

	controls.push(service_provider);

	return controls;
};
export default getControls;
