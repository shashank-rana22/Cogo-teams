import { ButtonGroup } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import { getButtonGroups } from '../../../../../../constants/teamsHeaderMappings';
import useCreateVideoCallTimeline from '../../../../../../hooks/useCreateVideoCallTimeline';

function VideoCalling({ activeTab = {} }) {
	const { inVideoCall = false, loggedInAgentId = '' } = useSelector(({ profile }) => ({
		inVideoCall     : profile?.is_in_video_call || false,
		video_call_id   : profile?.video_call_id,
		loggedInAgentId : profile?.user?.id,
	}));

	const { data = {}, groupData = {} } = activeTab || {};

	const { is_draft = false } = data || {};

	const { group_members_ids = [] } = groupData || {};

	const { group_members_ids: draftGroupMemberIds = [] } = data || {};

	const selectedGroupMembersIds = is_draft ? draftGroupMemberIds : group_members_ids;

	const userId = selectedGroupMembersIds?.find((eachId) => eachId !== loggedInAgentId) || '';

	const { createVideoCallTimeline } = useCreateVideoCallTimeline({ formattedData: { user_id: userId } });

	const mountVideoCall = useCallback(async () => {
		if (!inVideoCall && userId) {
			await createVideoCallTimeline({ userCallId: userId, leadUserId: '' });
		}
	}, [createVideoCallTimeline, inVideoCall, userId]);

	const buttonsMappings = getButtonGroups({ onClickFun: mountVideoCall });

	return (
		<ButtonGroup
			size="xs"
			options={buttonsMappings}
		/>
	);
}

export default VideoCalling;
