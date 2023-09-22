import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function AddMembers() {
	const [selectedMembers, setSelectedMembers] = useState([]);
	const isNoSelectedUsers = isEmpty(selectedMembers);

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Add people
			</div>

			<AsyncSelect
				multiple
				asyncKey="list_chat_agents"
				value={selectedMembers}
				// valueKey="agent_id"
                // name="agent_id"
				placeholder="Enter a name or email"
				onChange={setSelectedMembers}
				className={styles.select}
				isClearable
				// renderLabel={(item) => <RenderSelectLabel item={item} />}
			/>

			<div className={styles.action}>
				<Button disabled={isNoSelectedUsers} size="md" themeType="primary">Add</Button>
			</div>
		</div>
	);
}

export default AddMembers;
