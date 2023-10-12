import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import useCreateOrGetDraftTeamRoom from '../../../../../../hooks/useCreateOrGetDraftTeamRoom';
import getCommonAgentType from '../../../../../../utils/getCommonAgentType';
import UserCard from '../UserCard';

import styles from './styles.module.css';

function outerClick({ event, ref, setTriggerCreation }) {
	if (ref.current && !ref.current.contains(event.target)) {
		setTriggerCreation(true);
	}
}

function ToUser({
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
}) {
	const selectRef = useRef(null);

	const [users, setUsers] = useState({ userIds: [], userData: [] });
	const [triggerCreation, setTriggerCreation] = useState(false);

	const {
		createOrGetDraftTeamRoom = () => {},
		loading,
	} = useCreateOrGetDraftTeamRoom({ firestore, setActiveTab, setTriggerCreation });

	const isEmptyList = isEmpty(users?.userIds);

	const teamsAdminFilter = viewType === 'cogoone_admin' ? undefined : getCommonAgentType({ viewType });

	useEffect(() => {
		function wrapper(event) {
			outerClick({ event, ref: selectRef, setTriggerCreation });
		}

		document.addEventListener('mousedown', wrapper);
		return () => {
			document.removeEventListener('mousedown', wrapper);
		};
	}, []);

	useEffect(() => {
		if (!triggerCreation || loading) {
			return;
		}

		if (isEmptyList) {
			setTriggerCreation(false);
			return;
		}

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
	}, [createOrGetDraftTeamRoom, isEmptyList, loading, triggerCreation, users]);

	return (
		<div className={styles.wrapper} ref={selectRef}>
			<div className={styles.flex_common}>
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
					caret={false}
					isClearable
					asyncKey="list_chat_agents"
					initialCall
					params={{
						filters: {
							status_not : 'inactive',
							agent_type : viewType?.includes('admin')
								? undefined : teamsAdminFilter || undefined,
							team_admins: !viewType?.includes('admin') ? undefined : [teamsAdminFilter],
						},
						sort_by: 'agent_type',
					}}
					renderLabel={(item) => <UserCard item={item} />}
				/>
			</div>
		</div>
	);
}

export default ToUser;
