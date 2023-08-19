import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFcrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function GroupMembers({
	groupMembers = [],
	partnerUsers = [],
	deleteGroupMember = () => {},
	hasAccessToEditGroup = false,
	agentId = '',
}) {
	const filteredMembers = partnerUsers.filter(
		(eachPartnerUser) => groupMembers.includes(eachPartnerUser?.agent_id),
	);

	if (isEmpty(filteredMembers)) {
		return null;
	}

	return (
		<div>
			<div className={styles.conversation_title}>
				Group Members
			</div>

			{(filteredMembers || []).map(
				(user) => (
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

						{(hasAccessToEditGroup || agentId === user?.agent_id) && (
							<IcCFcrossInCircle
								className={styles.cross_icon}
								onClick={() => deleteGroupMember(user?.agent_id)}
							/>
						)}
					</div>
				),
			)}
		</div>
	);
}

export default GroupMembers;
