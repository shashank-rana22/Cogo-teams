import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDIT_PARAMS_STAKEHOLDERS = ['booking_agent', 'superadmin'];

const CONTROLS_EDITABLE_CONDITIONS = [
	{
		state      : ['confirmed_by_service_provider'],
		trade_type : ['export'],
	},
	{
		state      : ['confirmed_by_service_provider'],
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

	if (user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id) {
		return true;
	}

	const userCanCancel = EDIT_PARAMS_STAKEHOLDERS.includes(activeStakeholder);

	const showEditParamsKey = serviceData?.show_edit_params;

	const isControlsEditable = CONTROLS_EDITABLE_CONDITIONS.some(
		(conditions) => getShowCondition(shipment_data, conditions),
	);

	return userCanCancel && showEditParamsKey && isControlsEditable;
}
