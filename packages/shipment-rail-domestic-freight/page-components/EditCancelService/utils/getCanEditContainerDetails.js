import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export default function getCanEditContainerDetails({ shipment_data, user_data, serviceData, stakeholderConfig }) {
	if (`${shipment_data?.shipment_type}_service` !== serviceData?.service_type) {
		return false;
	}

	if ([GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id, GLOBAL_CONSTANTS.uuid.hk_user_id].includes(user_data?.id)) {
		return true;
	}

	let userCanEdit = !!stakeholderConfig?.edit_params?.can_edit;
	if (userCanEdit && stakeholderConfig?.edit_params?.idToMatch) {
		const idToMatch = shipment_data[stakeholderConfig?.edit_params?.idToMatch];
		userCanEdit = idToMatch === serviceData?.importer_exporter?.id;
	}

	return userCanEdit;
}
