import React, { useState } from 'react';

import useUpdateCogooneGroup from '../../../../../../hooks/useUpdateCogooneGroup';

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
}) {
	const [addMembers, setAddMembers] = useState(false);

	const { updateCogooneGroup = () => {}, loading = false } = useUpdateCogooneGroup({ activeTab, setAddMembers });

	return (
		<div className={styles.container}>
			{addMembers ? (
				<AddMembers
					viewType={viewType}
					setAddMembers={setAddMembers}
					updateCogooneGroup={updateCogooneGroup}
					loading={loading}
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
				/>
			)}
		</div>
	);
}

export default Members;
