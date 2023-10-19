import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef, useEffect } from 'react';

import { COGOVERSE_AGENT_FILTERS_MAPPINGS, HR_TEAM_FILTER } from '../../../../../../constants/filterKeysMapping';
import useCreateOrGetDraftTeamRoom from '../../../../../../hooks/useCreateOrGetDraftTeamRoom';
import getCommonAgentType from '../../../../../../utils/getCommonAgentType';
import UserCard from '../UserCard';

import styles from './styles.module.css';

const ADMIN_VIEW = ['admin', 'cogoone_admin', 'hr', 'hr_admin'];

const TEAM_WISE_ADMINS = ['sales_admin', 'supply_admin', 'shipment_specialist_admin'];

function outerClick({ event, ref, setTriggerCreation }) {
	if (ref.current && !ref.current.contains(event.target)) {
		setTimeout(() => {
			setTriggerCreation(true);
		}, 0);
	}
}

function ToUser({
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
	setLoadingDraft = () => {},
	loadingDraft = false,
}) {
	const selectRef = useRef(null);

	const [users, setUsers] = useState({ userIds: [], userData: [] });
	const [triggerCreation, setTriggerCreation] = useState(false);

	const {
		createOrGetDraftTeamRoom = () => {},
	} = useCreateOrGetDraftTeamRoom({ firestore, setActiveTab, setTriggerCreation, setLoadingDraft });

	const isEmptyList = isEmpty(users?.userIds);

	const isTeamsAdmin = ADMIN_VIEW.includes(viewType);

	const isTeamWiseAdmin = TEAM_WISE_ADMINS.includes(viewType);

	const commonAgentType = getCommonAgentType({ viewType });

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
		if (!triggerCreation || loadingDraft) {
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
	}, [createOrGetDraftTeamRoom, isEmptyList, loadingDraft, triggerCreation, users]);

	return (
		<div className={styles.wrapper} ref={selectRef}>
			<div className={styles.flex_common}>
				To:
				{loadingDraft ? <div className={styles.loading}>loading...</div> : (
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
								agent_type : isTeamsAdmin
									? undefined : [
										...(COGOVERSE_AGENT_FILTERS_MAPPINGS[viewType] || []),
										...HR_TEAM_FILTER,
									],
								teams_admins: isTeamWiseAdmin ? [commonAgentType] : undefined,
							},
							sort_by: 'agent_type',
						}}
						renderLabel={(item) => <UserCard item={item} />}
					/>
				)}
			</div>
		</div>
	);
}

export default ToUser;
