import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function GroupMembersRequests({
	deleteGroupRequest = () => {},
	approveGroupRequest = () => {},
	groupMembers = [],
	partnerUsers = [],
	hasAccessToEditGroup = false,
	agentId = '',
}) {
	const filteredMembers = partnerUsers?.filter(
		(eachMember) => groupMembers.includes(eachMember?.agent_id),
	);

	if (isEmpty(filteredMembers)) {
		return null;
	}

	return (
		<div>
			<div className={styles.conversation_title}>
				Group Requests
			</div>

			{filteredMembers?.map(
				(user = {}) => (
					<div
						className={styles.content}
						key={user?.agent_id}
					>
						<Avatar
							src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
							alt="img"
							disabled={false}
							className={styles.user_div}
						/>

						<div className={styles.details}>
							<div className={styles.name}>
								{user?.name}
							</div>

							<div className={styles.email}>
								{user?.email}
							</div>
						</div>

						{(hasAccessToEditGroup || agentId === user?.agent_id) ? (
							<div className={styles.mark_status}>
								{agentId !== user?.agent_id ? (
									<IcCFtick
										className={styles.icon}
										onClick={() => approveGroupRequest(user?.agent_id)}
									/>
								) : <div className={styles.empty_icon} />}

								<IcCFcrossInCircle
									className={styles.icon}
									onClick={() => deleteGroupRequest(user?.agent_id)}
								/>
							</div>
						) : null}
					</div>
				),
			)}
		</div>
	);
}

export default GroupMembersRequests;
