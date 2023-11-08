import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function formattedData({ values = {} }) {
	const geo = getGeoConstants();
	let { users, selected_role_ids } = values;
	const { entityType, type, cpAuthRolesAPI } = values;
	const cpDefaultRoles = (cpAuthRolesAPI?.data?.list || []).map(
		(role) => role?.id,
	);

	const cpDefaultUserRoles = (cpAuthRolesAPI?.data?.list || [])
		.filter((role) => role?.name === 'CP Admin')
		.map((role) => role?.id);

	let account_type;
	const IS_SEZ = false;
	const IS_ALLOWED_SELF_INVOICING = true;
	if (entityType === 'channel_partner') {
		selected_role_ids = cpDefaultRoles;
		account_type = 'importer_exporter';
	}
	if (Array.isArray(users)) {
		users = users.map((user, index) => {
			const { name, email, phone_number } = user;
			const newUser = {
				...{ name, email, phone_number },
				is_primary: index === GLOBAL_CONSTANTS.zeroth_index,
			};
			if (type === 'create' && entityType === 'channel_partner') {
				newUser.preferred_languages = ['english'];
				newUser.selected_role_ids = cpDefaultUserRoles;
			}
			return newUser;
		});
	}

	const { parent_entity_id } = geo.uuid;
	const data = {
		...values,
		entity_types              : [entityType],
		users,
		is_allowed_self_invoicing : IS_ALLOWED_SELF_INVOICING,
		is_sez                    : IS_SEZ,
		account_type,
		parent_entity_id,
		role_ids                  : selected_role_ids,
		selected_role_ids,
	};
	return data;
}
export default formattedData;
