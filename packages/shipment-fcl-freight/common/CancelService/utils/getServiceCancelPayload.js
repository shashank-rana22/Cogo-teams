import { getSideEffectsServices } from '../../EditCancelService/utils/getSideEffectsServices';

export default function getServiceCancelPayload({
	controls = {}, servicesList = [], service_type = '', trade_type = '', formData = {}, shipment_data = {},
}) {
	const cancelIds = (
		getSideEffectsServices({ servicesList, service_type, trade_type }) || []
	).map((service) => service?.id);

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
