import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateOrGetDraftTeamRoom from '../../../../../../hooks/useCreateOrGetDraftTeamRoom';
import getCommonAgentType from '../../../../../../utils/getCommonAgentType';
import UserCard from '../UserCard';

import styles from './styles.module.css';

function ToUser({
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
	hashFunction = () => {},
}) {
	const [users, setUsers] = useState({ userIds: [], userData: [] });

	const {
		createOrGetDraftTeamRoom = () => {},
		loading = false,
	} = useCreateOrGetDraftTeamRoom({ firestore, setActiveTab, hashFunction });

	const handleSave = () => {
		const { userIds = [], userData = [] } = users || {};
		const modifiedUserData = userData?.map((eachUser) => ({
			id       : eachUser?.agent_id,
			name     : eachUser?.name,
			is_admin : false,
		})) || [];

		createOrGetDraftTeamRoom({ userIds, userIdsData: modifiedUserData });
	};

	return (
		<div className={styles.flex_common}>
			<div className={styles.flex_child}>
				To:
				<AsyncSelect
					multiple
					value={users?.userIds || []}
					className={styles.input_styles}
					size="sm"
					placeholder="Enter a name or email"
					onChange={(val, obj) => {
						setUsers({ userIds: val, userData: obj });
					}}
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
			<Button
				size="md"
				themeType="tertiary"
				className={styles.button_styles}
				loading={loading}
				onClick={handleSave}
			>
				<IcMPlus className={styles.plus_icon} />
			</Button>
		</div>
	);
}

export default ToUser;
