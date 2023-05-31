const editParamsStakeholders = {
	booking_agent: {
		idToMatch: 'importer_exporter_id',
	},
	consignee_shipper_booking_agent: {
		idToMatch: 'consignee_shipper_id',
	},
	superadmin: {},
};

const controlsEditableConditions = [
	{
		state      : ['confirmed_by_service_provider'],
		trade_type : ['export'],
		bl_type    : ['rfs'],
	},
	{
		state      : ['confirmed_by_service_provider', 'containers_gated_in'],
		trade_type : ['export'],
		bl_type    : ['sob', 'seaway'],
	},
	{
		state      : ['confirmed_by_service_provider', 'containers_gated_in', 'vessel_departed'],
		trade_type : ['import'],
	},
];

function getShowCondition(shipment_data, conditions) {
	return Object.entries(conditions).some(([key, value]) => value.includes(shipment_data[key]));
}

export default function getCanEditParams({ shipment_data, user_data, serviceData, activeStakeholder }) {
	if (`${shipment_data?.shipment_type}_service` !== serviceData?.service_type) {
		return false;
	}

	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}

	let userCanEdit = activeStakeholder in editParamsStakeholders;
	if (userCanEdit && editParamsStakeholders[activeStakeholder]?.idToMatch) {
		const idToMatch = shipment_data[editParamsStakeholders[activeStakeholder].idToMatch];
		userCanEdit = idToMatch === serviceData?.importer_exporter?.id;
	}

	const showEditParamsKey = serviceData?.show_edit_params;

	const isControlsEditable = controlsEditableConditions.some(
		(conditions) => getShowCondition(shipment_data, conditions),
	);

	return userCanEdit && showEditParamsKey && isControlsEditable;
}
