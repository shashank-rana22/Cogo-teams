import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

export const hasPermission = [
	geo.uuid.super_admin_id,
	geo.uuid.tech_super_admin_id,
	geo.uuid.cogoverse_admin,
];

export const PARAMOUNT_ORG_ID = '1e4b9f43-4863-4e29-a944-8e9e8780e514';

export const COGOVERSE_USER_ID = 'a217c304-5296-4f1d-948c-814fa9ed9cdb';
