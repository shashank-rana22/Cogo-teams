import React, { useState } from 'react';

import AddMembers from './AddMembers';
import MembersList from './MembersList';
import styles from './styles.module.css';

function Members({ viewType = '', groupMembersList = [{}] }) {
	const [addMembers, setAddMembers] = useState(false);

	return (
		<div className={styles.container}>
			{addMembers ? (
				<AddMembers
					viewType={viewType}
					setAddMembers={setAddMembers}
				/>
			) : (
				<MembersList
					groupMembersList={groupMembersList}
					setAddMembers={setAddMembers}
				/>
			)}
		</div>
	);
}

export default Members;
