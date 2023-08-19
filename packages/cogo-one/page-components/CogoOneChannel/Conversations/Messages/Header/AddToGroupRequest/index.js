import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGroupChat from '../../../../../../hooks/useGroupChat';
import useListPartnerUsers from '../../../../../../hooks/useListPartnerUsers';

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

	const {
		approveGroupRequest = () => {},
		deleteGroupRequest = () => {},
	} = useGroupChat({ activeMessageCard, firestore });

	if (isEmpty(filteredMembers)) {
		return null;
	}

	return (
		<div className={styles.approve_req_container}>
			{filteredMembers.map(
				(user = {}) => (
					<div
						className={styles.approve_req}
						key={user?.agent_id}
					>
						<div className={styles.agent_name}>
							<span>
								{user.name || 'A agent'}
							</span>
							has requested you to join the group.
						</div>

						<IcCFtick
							className={styles.icon_styles}
							onClick={() => approveGroupRequest(user?.agent_id)}
						/>

						<IcCFcrossInCircle
							className={styles.icon_styles}
							onClick={() => deleteGroupRequest(user?.agent_id)}
						/>
					</div>
				),
			)}
		</div>
	);
}

export default AddToGroupRequest;
