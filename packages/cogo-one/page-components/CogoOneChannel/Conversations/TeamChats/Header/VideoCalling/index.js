import { ButtonGroup } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import React, { useState } from 'react';

import { getButtonGroups } from '../../../../../../constants/teamsHeaderMappings';
import useUpdateVideoConference from '../../../../../../hooks/useUpdateVideoConference';

import CallModal from './CallModal';

function VideoCalling({
	activeTab = {},
	searchName = '',
	isGroup = false,
}) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { loading, data, updateVideoConference } = useUpdateVideoConference();

	const { groupData = {} } = activeTab || {};

	const { id = '', group_members_ids = [] } = groupData || {};

	const onClickFunc = () => {
		updateVideoConference({ groupId: id, groupMemberIds: group_members_ids, searchName, isGroup });
		setShowDeleteModal(true);
	};

	const buttonsMappings = getButtonGroups({ onClickFunc });

	if (data && data?.join && showDeleteModal) {
		// eslint-disable-next-line max-len
		const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME) || 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc3NzgxNzIsImlhdCI6MTY5NzYwNTM3MiwiVXNlclNlc3Npb25JRCI6IjEwOWM3MWQxLTNlOGMtNDM5OS1hOGY5LWVjMzEwY2JhODk2YiJ9.R8Qb7n3gMO8EXnl-i-Sv2ZvlEBOsanmP_n1C5cvWfHoJV3-3aTtzDR0TOsDtC3RZdawxMesLU008R21TMGGL3Q';
		return (
			<CallModal
				url={`${data.join}&auth=${cogo_admin_auth_token}`}
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
			/>
		);
	}

	return (
		<ButtonGroup
			size="xs"
			disabled={loading}
			options={buttonsMappings}
		/>
	);
}

export default VideoCalling;
