import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CONTROLS_EDIT_CONDITIONS = [
	{
		state: ['awaiting_service_provider_confirmation', 'container_arrived',
			'confirmed_by_service_provider', 'init', 'container_departed'],
		trade_type: ['domestic'],
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

	const isControlsEditable = CONTROLS_EDIT_CONDITIONS.some(
		(conditions) => getShowCondition({ trade_type: shipment_data?.trade_type, ...serviceData }, conditions),
	);

	return userCanEdit && showEditParamsKey && isControlsEditable;
}
