import { isEmpty } from '@cogoport/front/utils';

const air_lines = {
	type: 'select',
	optionsListKey: 'air-lines',
	caret: true,
	span: 5,
	name: 'airline_id',
	subType: 'select',
	label: 'Please select airline',
	placeholder: 'Search airline...',
	commodityType: 'air_freight',
	rules: { required: 'Air Line Details is Required' },
};

const shipping_line = {
	name: 'shipping_line_id',
	label: 'Shipping Line',
	type: 'select',
	optionsListKey: 'shipping-lines',
	span: 5,
	className: 'primary sm',
	rules: { required: 'Shipping Line is Required' },
};

const service_provider = {
	name: 'service_provider_id',
	type: 'select',
	label: 'Service Provider',
	optionsListKey: 'verified-service-providers',
	placeholder: 'Select Service Provider',
	rules: { required: 'Service Provider is Required' },
};

const getControls = ({
	service_type,
	shipment_data,
	formattedRate,
	subsidiaryService = {},
}) => {
	const iscarrierHaulage = () => {
		let iscarrier = false;
		(shipment_data?.all_services || []).forEach((service) => {
			if (
				service?.service_type === 'haulage_freight_service' &&
				service?.haulage_type === 'carrier'
			) {
				iscarrier = true;
			}
		});

		return iscarrier;
	};

	const getIds = () => {
		const ids = {
			fcl_shiplling_line_id: '',
			haulage_shiping_line_id: '',
			air_line_id: '',
		};

		(shipment_data?.all_services || []).forEach((service) => {
			if (
				service?.service_type === 'haulage_freight_service' &&
				service?.haulage_type === 'carrier'
			) {
				ids.haulage_shiping_line_id = service?.shipping_line_id || '';
			}
			if (service?.service_type === 'fcl_freight_service') {
				ids.fcl_shiplling_line_id = service.shipping_line_id || '';
			}
			if (service?.service_type === 'air_freight_service') {
				ids.air_line_id = service.airline_id || '';
			}
		});
		return ids;
	};

	const service_rendered = (shipment_data?.all_services || []).filter(
		(service) => service?.service_type === service_type,
	);

	let subsidiary_service_rendered = {};

	if (service_type === 'subsidiary_service') {
		subsidiary_service_rendered = (service_rendered || []).find(
			(service) => service?.code === subsidiaryService?.code,
		);
	}

	service_provider.value =
		subsidiary_service_rendered?.service_provider_id ||
		service_rendered?.[0]?.service_provider_id ||
		'';
	if (!isEmpty(formattedRate) && service_type === 'air_freight_service') {
		service_provider.value = '';
	}

	const controls = [];
	const data = getIds();

	if (['fcl_freight', 'fcl_freight_service'].includes(service_type)) {
		shipping_line.value = data.fcl_shiplling_line_id;
		controls.push(shipping_line);
	}

	if (iscarrierHaulage() && service_type === 'haulage_freight_service') {
		shipping_line.value = data.haulage_shiping_line_id;
		controls.push(shipping_line);
	}

	if (service_type === 'air_freight_service') {
		if (isEmpty(formattedRate)) {
			air_lines.value = data.air_line_id;
		}
		controls.push(air_lines);
	}

	controls.push(service_provider);

	return controls;
};
export default getControls;
