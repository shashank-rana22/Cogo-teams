import { AsyncSelect } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function AddGroupMember({ addGroupMember = () => {} }) {
	const [agentId, setAgentId] = useState('');

	const addMember = () => {
		if (!agentId) {
			return;
		}
		addGroupMember(agentId);
		setAgentId('');
	};

	return (
		<div>
			<div className={styles.conversation_title}>Add Group Member</div>
			<div className={styles.container}>
				<AsyncSelect
					key={agentId}
					name="agent_id"
					asyncKey="partner_users"
					value={agentId}
					valueKey="user_id"
					onChange={setAgentId}
					params={{
						rm_mappings_data_required : false,
						partner_data_required     : false,
						filters                   : { role_functions: ['supply'] },
					}}
					className={styles.select}
					isClearable
				/>
				<IcMPlusInCircle
					className={styles.icon}
					onClick={addMember}
					cursor={agentId ? 'pointer' : 'not-allowed'}
				/>
			</div>
		</div>
	);
}

export default AddGroupMember;
