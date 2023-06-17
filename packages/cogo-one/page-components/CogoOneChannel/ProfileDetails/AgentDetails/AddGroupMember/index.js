import { AsyncSelect } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function AddGroupMember({ addGroupMember = () => {} }) {
	const [agentId, setAgentId] = useState();

	const addMember = () => {
		addGroupMember(agentId);
		setAgentId(null);
	};

	return (
		<div>
			<div className={styles.conversation_title}>Add Group Member</div>
			<div className={styles.container}>
				<AsyncSelect
					name="agent_id"
					asyncKey="partner_users"
					value={agentId}
					endpoint="list_partner_users"
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
				<IcMPlusInCircle className={styles.icon} onClick={() => addMember()} />
			</div>
		</div>
	);
}

export default AddGroupMember;
