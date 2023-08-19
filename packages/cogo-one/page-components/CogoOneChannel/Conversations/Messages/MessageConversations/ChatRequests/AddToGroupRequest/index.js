import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGroupChat from '../../../../../../../hooks/useGroupChat';
import useListPartnerUsers from '../../../../../../../hooks/useListPartnerUsers';

import styles from './styles.module.css';

function AddToGroupRequest({
	firestore = {},
	activeMessageCard = {},
}) {
	const { partnerUsers = [] } = useListPartnerUsers({ activeMessageCard });

	const groupMembers = activeMessageCard?.requested_group_members || [];

	const filteredMembers = partnerUsers?.filter(
		(eachMember) => groupMembers.includes(eachMember?.agent_id),
	);

	const recentRequest = filteredMembers?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		approveGroupRequest = () => {},
		deleteGroupRequest = () => {},
	} = useGroupChat({ activeMessageCard, firestore });

	if (isEmpty(recentRequest)) {
		return null;
	}

	return (
		<div className={styles.approve_req}>
			<div className={styles.agent_name}>
				<span>
					{recentRequest?.name || 'A agent'}
				</span>
				has requested you to join the group.
			</div>

			<IcCFtick
				className={styles.icon_styles}
				onClick={() => approveGroupRequest(recentRequest?.agent_id)}
			/>

			<IcCFcrossInCircle
				className={styles.icon_styles}
				onClick={() => deleteGroupRequest(recentRequest?.agent_id)}
			/>
		</div>
	);
}

export default AddToGroupRequest;
