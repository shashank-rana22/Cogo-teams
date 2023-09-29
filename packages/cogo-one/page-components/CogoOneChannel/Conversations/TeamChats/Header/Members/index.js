import React, { useState } from 'react';

import AddMembers from './AddMembers';
import MembersList from './MembersList';
import styles from './styles.module.css';

function Members({ viewType = '' }) {
	const [addMembers, setAddMembers] = useState(false);
	console.log('setAddMembers', setAddMembers);

	return (
		<div className={styles.container}>
			{addMembers ? (
				<AddMembers />
			) : (
				<MembersList
					viewType={viewType}
				/>
			)}
		</div>
	);
}

export default Members;
