import { AsyncSelect } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function RenderSelectLabel({ item = {} }) {
	return	(
		<div>
			<div className={styles.agent_label}>
				{startCase(item?.name)}
			</div>

			<div className={styles.lower_label}>
				{startCase(item?.agent_type)}
			</div>
		</div>
	);
}

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
			<div className={styles.conversation_title}>
				Add Group Member
			</div>

			<div className={styles.container}>
				<AsyncSelect
					key={agentId}
					name="agent_id"
					asyncKey="list_chat_agents"
					value={agentId}
					valueKey="agent_id"
					onChange={setAgentId}
					className={styles.select}
					isClearable
					renderLabel={(item) => <RenderSelectLabel item={item} />}
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
