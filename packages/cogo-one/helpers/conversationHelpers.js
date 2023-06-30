import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

export function getHasPermissionToEdit({
	showBotMessages,
	userId,
	formattedData = {},
	canMessageOnBotSession,
	viewType,
}) {
	const {
		support_agent_id = '',
	} = formattedData || {};

	return canMessageOnBotSession
    || (!showBotMessages && (VIEW_TYPE_GLOBAL_MAPPING[viewType].permissions.has_permission_to_edit
        || userId === support_agent_id
        || formattedData.group_members?.includes(userId)));
}
