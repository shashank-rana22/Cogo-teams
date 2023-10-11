import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateOrGetDraftTeamRoom from '../../../../../../hooks/useCreateOrGetDraftTeamRoom';
import getCommonAgentType from '../../../../../../utils/getCommonAgentType';
import UserCard from '../UserCard';

import styles from './styles.module.css';

function ToUser({
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
}) {
	const [users, setUsers] = useState({ userIds: [], userData: [] });

	const {
		createOrGetDraftTeamRoom = () => {},
		loading = false,
	} = useCreateOrGetDraftTeamRoom({ firestore, setActiveTab });

	const handleSave = () => {
		const { userIds = [], userData = [] } = users || {};
		const modifiedUserData = userData?.map((eachUser) => ({
			id              : eachUser?.agent_id,
			name            : eachUser?.name,
			is_admin        : false,
			agent_data      : eachUser?.agent_data || null,
			office_location : eachUser?.partner?.office_location || null,
		})) || [];

		createOrGetDraftTeamRoom({
			userIds,
			userIdsData: modifiedUserData,
		});
	};

	const isEmptyList = isEmpty(users?.userIds);

	const teamsAdminFilter = viewType === 'cogoone_admin' ? undefined : getCommonAgentType({ viewType });

	return (
		<div className={styles.wrapper}>
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
								agent_type : viewType?.includes('admin')
									? undefined : teamsAdminFilter || undefined,
								team_admins: !viewType?.includes('admin') ? undefined : [teamsAdminFilter],
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
					disabled={isEmptyList}
				>
					<IcMPlus className={styles.plus_icon} />
				</Button>
			</div>
		</div>
	);
}

export default ToUser;
