import { AsyncSelect } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';

import getCommonAgentType from '../../../../../../utils/getCommonAgentType';
import UserCard from '../UserCard';

import styles from './styles.module.css';

function ToUser({ users = [], setUsers = () => {}, viewType = '' }) {
	return (
		<div className={styles.flex_common}>
			<div className={styles.flex_child}>
				To:
				<AsyncSelect
					multiple
					value={users}
					className={styles.input_styles}
					size="sm"
					placeholder="Enter a name or email"
					onChange={setUsers}
					isClearable
					asyncKey="list_chat_agents"
					initialCall
					params={{
						filters: {
							status     : 'active',
							agent_type : viewType === 'cogoone_admin'
								? undefined : getCommonAgentType({ viewType }) || undefined,
						},
						sort_by: 'agent_type',
					}}
					renderLabel={(item) => <UserCard item={item} />}
				/>
			</div>
			<IcMPlus className={styles.plus_icon} />
		</div>
	);
}

export default ToUser;
