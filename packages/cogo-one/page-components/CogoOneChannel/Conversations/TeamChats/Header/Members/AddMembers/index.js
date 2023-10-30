import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { COGOVERSE_AGENT_FILTERS_MAPPINGS, HR_TEAM_FILTER } from '../../../../../../../constants/filterKeysMapping';
import getCommonAgentType from '../../../../../../../utils/getCommonAgentType';
import UserCard from '../../UserCard';

import styles from './styles.module.css';

const ADMIN_VIEW = ['admin', 'cogoone_admin', 'hr', 'hr_admin'];

const TEAM_WISE_ADMINS = ['sales_admin', 'supply_admin', 'shipment_specialist_admin'];

function AddMembers({
	viewType = '',
	setAddMembers = () => {},
	updateCogooneGroup = () => {},
	loading = false,
	updateDraftLocalCogooneGroup = () => {},
	isDraft = false,
}) {
	const [selectedMembersData, setSelectedMembersData] = useState({ userIds: [], userIdsData: [] });

	const selectedMembers = selectedMembersData?.userIds;

	const isNoSelectedUsers = isEmpty(selectedMembers);

	const updateGroup = () => {
		if (isDraft) {
			const modifiedUserData = selectedMembersData?.userIdsData?.map((eachUser) => ({
				id              : eachUser?.agent_id || null,
				name            : eachUser?.name || null,
				is_admin        : false,
				partner         : eachUser?.partner || null,
				agent_data      : eachUser?.agent_data || null,
				office_location : eachUser?.partner?.office_location || null,
			})) || [];

			updateDraftLocalCogooneGroup(
				{
					actionName  : 'ADD_TO_GROUP',
					userIds     : selectedMembers,
					userIdsData : modifiedUserData,
				},
			);
			return;
		}

		updateCogooneGroup(
			{ actionName: 'ADD_TO_GROUP', userIds: selectedMembers },
		);
	};

	const isTeamsAdmin = ADMIN_VIEW.includes(viewType);

	const isTeamWiseAdmin = TEAM_WISE_ADMINS.includes(viewType);

	const commonAgentType = getCommonAgentType({ viewType });

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Add people
			</div>

			<AsyncSelect
				multiple
				value={selectedMembers}
				placeholder="Enter a name or email"
				onChange={(val, obj) => {
					setSelectedMembersData({ userIds: val, userIdsData: obj });
				}}
				isClearable
				asyncKey="list_chat_agents"
				initialCall
				params={{
					filters: {
						status_not : 'inactive',
						agent_type : isTeamsAdmin
							? undefined : [
								...(COGOVERSE_AGENT_FILTERS_MAPPINGS[viewType] || []),
								...HR_TEAM_FILTER,
							],
						teams_admins: isTeamWiseAdmin ? [commonAgentType] : undefined,
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
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					disabled={isNoSelectedUsers}
					size="md"
					themeType="primary"
					loading={loading}
					onClick={updateGroup}
				>
					Add
				</Button>
			</div>
		</div>
	);
}

export default AddMembers;
