import React, { useState } from 'react';

import useUpdateCogooneGroup from '../../../../../../hooks/useUpdateCogooneGroup';
import useUpdateDraftLocalCogooneGroup from '../../../../../../hooks/useUpdateDraftLocalCogooneGroup';

import AddMembers from './AddMembers';
import MembersList from './MembersList';
import styles from './styles.module.css';

function Members({
	viewType = '',
	membersList = [],
	activeTeamCard = {},
	activeTab = {},
	hasPermissionToEdit = false,
	loggedInUserId = '',
	firestore = {},
	isDraft = false,
}) {
	const [addMembers, setAddMembers] = useState(false);

	const {
		updateCogooneGroup = () => {},
		globalLoading = false,
	} = useUpdateCogooneGroup({ activeTab, setAddMembers });

	const {
		updateDraftLocalCogooneGroup,
		draftUpdateLoading = false,
		loggedInAgentId = '',
	} = useUpdateDraftLocalCogooneGroup({ activeTab, setAddMembers, firestore });

	const loading = isDraft ? draftUpdateLoading : globalLoading;

	return (
		<div className={styles.container}>
			{addMembers ? (
				<AddMembers
					viewType={viewType}
					setAddMembers={setAddMembers}
					updateCogooneGroup={updateCogooneGroup}
					loading={loading}
					updateDraftLocalCogooneGroup={updateDraftLocalCogooneGroup}
					isDraft={isDraft}
				/>
			) : (
				<MembersList
					membersList={membersList}
					setAddMembers={setAddMembers}
					activeTeamCard={activeTeamCard}
					updateCogooneGroup={updateCogooneGroup}
					hasPermissionToEdit={hasPermissionToEdit}
					loggedInUserId={loggedInUserId}
					loading={loading}
					updateDraftLocalCogooneGroup={updateDraftLocalCogooneGroup}
					loggedInAgentId={loggedInAgentId}
				/>
			)}
		</div>
	);
}

export default Members;
