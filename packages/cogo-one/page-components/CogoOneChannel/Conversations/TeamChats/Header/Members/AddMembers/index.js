import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import getCommonAgentType from '../../../../../../../utils/getCommonAgentType';
import UserCard from '../../UserCard';

import styles from './styles.module.css';

function AddMembers({ viewType = '', setAddMembers = () => {} }) {
	const [selectedMembers, setSelectedMembers] = useState([]);
	const isNoSelectedUsers = isEmpty(selectedMembers);

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Add people
			</div>

			<AsyncSelect
				multiple
				value={selectedMembers}
				placeholder="Enter a name or email"
				onChange={setSelectedMembers}
				isClearable
				asyncKey="list_chat_agents"
				initialCall
				params={{
					filters: {
						status: 'active',
						agent_type:
						viewType === 'cogoone_admin' ? undefined : getCommonAgentType({ viewType }) || undefined,
					},
					sort_by: 'agent_type',
				}}
				size="sm"
				renderLabel={(item) => <UserCard item={item} />}
			/>

			<div className={styles.action}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setAddMembers(false)}
				>
					cancel

				</Button>
				<Button disabled={isNoSelectedUsers} size="md" themeType="primary">Add</Button>
			</div>
		</div>
	);
}

export default AddMembers;
