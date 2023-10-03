import { Button, cl, Input } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateOrGetDraftTeamRoom from '../../../../../../hooks/useCreateOrGetDraftTeamRoom';
import getCommonAgentType from '../../../../../../utils/getCommonAgentType';
import UserCard from '../UserCard';

import styles from './styles.module.css';

const MIN_GROUP_LENGTH = 1;

function ToUser({
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
}) {
	const [users, setUsers] = useState({ userIds: [], userData: [] });

	const [groupName, setGroupName] = useState('');

	const [showGroupError, setShowGroupError] = useState(false);

	const {
		createOrGetDraftTeamRoom = () => {},
		loading = false,
	} = useCreateOrGetDraftTeamRoom({ firestore, setActiveTab, setShowGroupError });

	const handleSave = () => {
		const { userIds = [], userData = [] } = users || {};
		const modifiedUserData = userData?.map((eachUser) => ({
			id       : eachUser?.agent_id,
			name     : eachUser?.name,
			is_admin : false,
		})) || [];

		createOrGetDraftTeamRoom({
			userIds,
			userIdsData: modifiedUserData,
			groupName,
		});
	};

	const isEmptyList = isEmpty(users?.userIds);

	const isGroup = users?.userIds?.length > MIN_GROUP_LENGTH;

	const isNameEmpty = isGroup && isEmpty(groupName);

	const showGroupInput = isGroup && showGroupError;

	return (
		<div className={styles.wrapper}>
			<div className={cl`${styles.group_name} ${showGroupInput ? styles.group_name_visible : ''}`}>
				{showGroupInput ? (
					<>
						<div className={styles.group_name_label}>*Group Name:</div>
						<Input
							size="sm"
							value={groupName}
							onChange={setGroupName}
							placeholder=" "
						/>
					</>
				) : null}
			</div>
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
					disabled={isEmptyList || (isNameEmpty && showGroupError)}
				>
					<IcMPlus className={styles.plus_icon} />
				</Button>
			</div>
		</div>
	);
}

export default ToUser;
