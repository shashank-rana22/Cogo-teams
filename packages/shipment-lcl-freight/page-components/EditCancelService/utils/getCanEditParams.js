import CONSTANTS from '../../../configs/constants.json';

const controlsEditableConditions = [
	{
		state      : ['confirmed_by_service_provider', 'cargo_carted_in', 'cargo_stuffed'],
		trade_type : ['export'],
	},
	{
		state      : ['confirmed_by_service_provider', 'cargo_carted_in', 'cargo_stuffed', 'vessel_departed'],
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

	if (user_data?.email === CONSTANTS.ajeet_email) {
		return true;
	}

	let userCanEdit = !!stakeholderConfig?.edit_params?.can_edit;
	if (userCanEdit && stakeholderConfig?.edit_params?.idToMatch) {
		const idToMatch = shipment_data[stakeholderConfig?.edit_params?.idToMatch];
		userCanEdit = idToMatch === serviceData?.importer_exporter?.id;
	}

	const showEditParamsKey = serviceData?.show_edit_params;

	const isControlsEditable = controlsEditableConditions.some(
		(conditions) => getShowCondition({ trade_type: shipment_data?.trade_type, ...serviceData }, conditions),
	);

	return userCanEdit && showEditParamsKey && isControlsEditable;
}
