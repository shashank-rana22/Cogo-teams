import getGeoConstants from '@cogoport/globalization/constants/geo';

export const stakeHolderOptions = [
	{ label: 'KAM', value: 'booking_agent' },
	{ label: 'Booking Desk', value: 'service_ops1' },
	{ label: 'Field Service Ops', value: 'field_service_ops' },
	{ label: 'FTL Ground Ops', value: 'ftl_ground_ops' },
];

export const getRoleIds = (stakeHolder) => {
	const geo = getGeoConstants();
	switch (stakeHolder) {
		case 'booking_agent': return [...geo.uuid.kam_ids, ...geo.uuid.kam_service_ops1_role_ids];
		case 'service_ops1': return [...geo.uuid.service_ops1_role_ids, ...geo.uuid.kam_service_ops1_role_ids];
		case 'field_service_ops': return geo.uuid.field_service_ops_role_ids;
		case 'ftl_ground_ops': return geo.uuid.ftl_ground_ops_role_ids;
		default: return undefined;
	}
};
