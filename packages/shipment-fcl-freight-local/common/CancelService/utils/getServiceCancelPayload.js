const COMPLETE_CANCEL = ['complete', 'cancelled'];

export default function getServiceCancelPayload({
	controls = {}, servicesList = [], service_type = '', trade_type = '', formData = {}, shipment_data = {},
}) {
	let cancellation_services = [];

	cancellation_services = (servicesList || []).filter(
		(item) => item?.service_type === service_type && item?.trade_type === trade_type,
	);

	const cancelIds = cancellation_services
		.filter((service) => !COMPLETE_CANCEL.includes(service.status))
		.map((service) => service?.id);

	const formValues = {};
	controls.forEach((ctrl) => { formValues[ctrl.name] = formData[ctrl.name]; });

	const payload = {
		ids                 : cancelIds,
		performed_by_org_id : shipment_data?.importer_exporter_id,
		service_type,
		data                : {
			state: 'cancelled',
			...formValues,
		},
	};

	return payload;
}