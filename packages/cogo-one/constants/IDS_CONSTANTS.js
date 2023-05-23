import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();
export const cogoOneAdmins = [
	geo?.uuid?.tech_super_admin_id,
	geo?.uuid?.cogoverse_admin_id,
	geo?.uuid?.super_admin_id,
];

export const PARAMOUNT_ORG_ID = '1e4b9f43-4863-4e29-a944-8e9e8780e514';

export const COGOVERSE_USER_ID = geo?.uuid.cogoverse_user_id;

export const shipmentAgentView = [
	geo?.uuid?.cogoverse_shipment_specialist_id,
];

export const VIEW_MAPPING = {
	admin_view    : cogoOneAdmins,
	shipment_view : shipmentAgentView,
};
