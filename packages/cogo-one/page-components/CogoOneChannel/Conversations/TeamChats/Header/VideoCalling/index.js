import { ButtonGroup } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import { getButtonGroups } from '../../../../../../constants/teamsHeaderMappings';
import useCreateVideoCallTimeline from '../../../../../../hooks/useCreateVideoCallTimeline';

function VideoCalling({
	activeTab = {},
	membersList = [],
}) {
	const { inVideoCall = false, loggedInAgentId = '' } = useSelector(({ profile }) => ({
		inVideoCall     : profile?.is_in_video_call || false,
		video_call_id   : profile?.video_call_id,
		loggedInAgentId : profile?.user?.id,
	}));

	const { data = {}, groupData = {} } = activeTab || {};

	const { group_members_ids = [] } = groupData || {};

	const { group_members_ids: draftGroupMemberIds = [], is_draft = false, group_members_data = [] } = data || {};

	const selectedGroupMembersIds = is_draft ? draftGroupMemberIds : group_members_ids;

	const userId = selectedGroupMembersIds?.find((eachId) => eachId !== loggedInAgentId) || '';

	const userName = is_draft
		? group_members_data?.find((eachUser) => eachUser?.id === userId)?.name
		: membersList?.find((eachUser) => eachUser?.user_id === userId)?.partner?.name;

	const { createVideoCallTimeline } = useCreateVideoCallTimeline({
		formattedData: { user_id: userId, user_name: userName },
	});

	const mountVideoCall = useCallback(async () => {
		if (!inVideoCall && userId && userName) {
			await createVideoCallTimeline({ userCallId: userId });
		}
	}, [createVideoCallTimeline, inVideoCall, userId, userName]);

	const buttonsMappings = getButtonGroups({ onClickFun: mountVideoCall });

	return (
		<ButtonGroup
			size="xs"
			options={buttonsMappings}
		/>
	);
}

export default VideoCalling;
