import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const truckDetailsControls = ({ shipment_data = {} }) => {
	const { entity_id = '', is_backdate_applicable = '', created_at = '' } = shipment_data || {};

	const disableDateTime = new Date(GLOBAL_CONSTANTS.others.ftl_disable_backdate_date).getTime();

	const featuredEntities = Object.entries(ENTITY_FEATURE_MAPPING).reduce((acc, [key, value]) => {
		if (value?.feature_supported?.includes('ftl_task_date_validation')) {
			const entityId = GLOBAL_CONSTANTS.cogoport_entities?.[key]?.id;
			acc.push(entityId);
		}
		return acc;
	}, []);

	const shipmentCreatedAtDate = new Date(created_at);

	const isShipmentCreatedAfter = featuredEntities.includes(entity_id)
	&& is_backdate_applicable
	&& shipmentCreatedAtDate.getTime() > disableDateTime;

	return [{
		name             : 'truck_detail',
		type             : 'fieldArray',
		showButtons      : true,
		showDeleteButton : true,
		controls         : [
			{
				name  : 'truck_number',
				type  : 'text',
				label : 'Truck Number',
				span  : 3,
				rules : { required: 'Truck Number is required' },
			},
			{
				name  : 'driver_name',
				type  : 'text',
				label : 'Driver Name',
				span  : 3,
				rules : { required: 'Driver Name is required' },
			},
			{
				name  : 'contact_number',
				type  : 'text',
				label : 'Contact Number',
				span  : 2,
				rules : { required: 'Contact Number is required' },
			},
			{
				name                  : 'estimated_departure',
				type                  : 'datepicker',
				label                 : 'ETD',
				span                  : 2,
				isPreviousDaysAllowed : true,
				minDate               : isShipmentCreatedAfter ? shipmentCreatedAtDate : null,
				rules                 : { required: 'Estimated Departure is required' },
			},
			{
				name                  : 'estimated_arrival',
				type                  : 'datepicker',
				label                 : 'ETA',
				span                  : 2,
				isPreviousDaysAllowed : true,
				minDate               : isShipmentCreatedAfter ? shipmentCreatedAtDate : null,
				rules                 : { required: 'Estimated Arrival is required' },
			},
		],
	}];
};
