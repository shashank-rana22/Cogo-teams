import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export default function checkIsEndToEnd({ booking_agents = [], trade_type = '', userData = {} }) {
	const isExport = trade_type === 'export';
	const isImport = trade_type === 'import';

	const roleId = userData?.auth_role_data?.id;
	const isSuperadmin = roleId === GLOBAL_CONSTANTS.uuid.superadmin_id;
	const userId = userData?.user?.id;

	return booking_agents?.some((item) => {
		const isDestinationAgent = item?.stakeholder_type === 'destination_booking_agent';
		const isOriginAgent = item?.stakeholder_type === 'origin_booking_agent';

		if (((isDestinationAgent && isExport && userId === item?.id) || isSuperadmin)
		|| 	(isOriginAgent && isImport && userId === item?.id) || isSuperadmin) {
			return true;
		}

		return false;
	});
}
