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
}) {
	const filteredMembers = partnerUsers?.filter((eachMember) => groupMembers.includes(eachMember?.user_id));

	if (isEmpty(filteredMembers)) {
		return null;
	}

	return (
		<div>
			<div className={styles.conversation_title}>Group Requests</div>
			{filteredMembers.map((user = {}) => (
				<div className={styles.content} key={user?.user_id}>
					<Avatar
						src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
						alt="img"
						disabled={false}
						className={styles.user_div}
					/>
					<div className={styles.details}>
						<div className={styles.name}>
							{user.name}
						</div>
						<div className={styles.email}>
							{user.email}
						</div>
					</div>
					{hasAccessToEditGroup
					&& (
						<div className={styles.mark_status}>
							<IcCFtick className={styles.icon} onClick={() => approveGroupRequest(user?.user_id)} />
							<IcCFcrossInCircle
								className={styles.icon}
								onClick={() => deleteGroupRequest(user?.user_id)}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default GroupMembersRequests;
