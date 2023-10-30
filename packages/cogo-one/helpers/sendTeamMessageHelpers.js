import { isEmpty } from '@cogoport/utils';

const getCommunicationPayload = ({
	loggedInAgentId = '', groupId = '', activeTab = {}, draftMessage = '',
	attachments = [],
}) => {
	const { data = {}, groupData } = activeTab || {};

	const {
		is_draft = false,
		group_members_ids = [],
	} = data || {};

	const { group_members_ids: publishedGroupMembers = [] } = groupData || {};

	const preferredGroupMembers = is_draft ? group_members_ids : publishedGroupMembers || [];

	const filteredGroupMembers = preferredGroupMembers?.filter((eachId) => eachId !== loggedInAgentId);

	return {
		type              : 'internal_chat',
		source            : 'CogoOne:AdminPlatform',
		conversation_type : 'outward',
		service           : 'user',
		sender_user_id    : loggedInAgentId,
		recipient         : groupId,
		service_id        : loggedInAgentId,
		message_metadata  : {
			message_type : isEmpty(attachments) ? 'text' : 'media',
			text         : draftMessage,
			user_ids     : filteredGroupMembers,
			media_url    : attachments,
		},
	};
};

export { getCommunicationPayload };
