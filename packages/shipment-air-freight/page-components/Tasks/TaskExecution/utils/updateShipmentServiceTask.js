import toastApiError from '@cogoport/air-modules/utils/toastApiError';

const HOURS_TO_SUBTRACT = 12;

const updateShipmentServiceTask = async ({
	rawValues = {},
	mainAirFreight = {},
	task = {},
	updateShipmentServiceTaskTrigger = () => {},
}) => {
	const date = rawValues?.schedule_departure;
	date.setHours(date.getHours() - HOURS_TO_SUBTRACT);

	let hasError = false;

	try {
		await updateShipmentServiceTaskTrigger({
			params: {
				data        : { ...rawValues, cargo_handed_over_at_origin_at: date },
				shipment_id : mainAirFreight?.shipment_id,
				ids         : [
					mainAirFreight?.id,
				],
				performed_by_org_id : task?.organization_id,
				service_type        : 'air_freight_service',
			},
		});
	} catch (error) {
		hasError = true;
		toastApiError(error);
	}
	return hasError;
};

export default updateShipmentServiceTask;
