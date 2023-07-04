import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CONTROLS_EDITABLE_CONDITIONS = [
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

export default function getCanEditParams({ shipment_data, user_data, serviceData, stakeholderConfig }) {
	if (`${shipment_data?.shipment_type}_service` !== serviceData?.service_type) {
		return false;
	}

	if (user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id) {
		return true;
	}

	let userCanEdit = !!stakeholderConfig?.edit_params?.can_edit;
	if (userCanEdit && stakeholderConfig?.edit_params?.idToMatch) {
		const idToMatch = shipment_data[stakeholderConfig?.edit_params?.idToMatch];
		userCanEdit = idToMatch === serviceData?.importer_exporter?.id;
	}

	const showEditParamsKey = serviceData?.show_edit_params;

	const isControlsEditable = CONTROLS_EDITABLE_CONDITIONS.some(
		(conditions) => getShowCondition(shipment_data, conditions),
	);

	return userCanEdit && showEditParamsKey && isControlsEditable;
}
