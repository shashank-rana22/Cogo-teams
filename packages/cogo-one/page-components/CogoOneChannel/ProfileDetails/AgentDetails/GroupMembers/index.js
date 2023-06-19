import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFcrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function GroupMembers({
	group_members = [], partner_users = [], deleteGroupMember = () => {},
	hasAccessToEditGroup = false,
}) {
	const members = partner_users.filter((x) => group_members.includes(x.user_id));
	return (
		<div>
			{!isEmpty(members) && <div className={styles.conversation_title}>Group Members</div>}
			{members.map((user) => (
				<div className={styles.content} key={user?.id}>
					<Avatar
						src={GLOBAL_CONSTANTS.image_url.user_avatar}
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
					{hasAccessToEditGroup
						&& (
							<div className={styles.mark_status}>
								<IcCFcrossInCircle
									className={styles.icon}
									onClick={() => deleteGroupMember(user?.user_id)}
								/>
							</div>
						)}
				</div>
			))}
		</div>
	);
}

export default GroupMembers;
