const editParamsStakeholders = ['booking_agent', 'superadmin'];

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

	const userCanCancel = editParamsStakeholders.includes(activeStakeholder);

	const showEditParamsKey = serviceData?.show_edit_params;

	const isControlsEditable = controlsEditableConditions.some(
		(conditions) => getShowCondition(shipment_data, conditions),
	);

	return userCanCancel && showEditParamsKey && isControlsEditable;
}
