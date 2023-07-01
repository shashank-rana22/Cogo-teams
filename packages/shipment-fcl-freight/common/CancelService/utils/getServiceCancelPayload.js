const NOT_CANCEL_ID_STATUS = ['complete', 'cancelled'];

export default function getServiceCancelPayload({
	controls = {}, servicesList = [], service_type = '', trade_type = '', formData = {}, shipment_data = {},
}) {
	let cancellation_services = [];

	if (service_type === 'fcl_freight_service') {
		cancellation_services = (servicesList || []).filter(
			(item) => item?.service_type === service_type,
		);
	} else if (service_type === 'haulage_freight_service') {
		cancellation_services = (servicesList || []).filter(
			(item) => ['trailer_freight_service', 'haulage_freight_service'].includes(
				item?.service_type,
			) && item?.trade_type === trade_type,
		);
	} else {
		cancellation_services = (servicesList || []).filter(
			(item) => item?.service_type === service_type && item?.trade_type === trade_type,
		);
	}

	const cancelIds = cancellation_services
		.filter((service) => !NOT_CANCEL_ID_STATUS.includes(service.status))
		.map((service) => service?.id);

	const FORM_VALUES = {};
	controls.forEach((ctrl) => { FORM_VALUES[ctrl.name] = formData[ctrl.name]; });

	const payload = {
		ids                 : cancelIds,
		performed_by_org_id : shipment_data?.importer_exporter_id,
		service_type,
		data                : {
			state: 'cancelled',
			...FORM_VALUES,
		},
	};

	return payload;
}
