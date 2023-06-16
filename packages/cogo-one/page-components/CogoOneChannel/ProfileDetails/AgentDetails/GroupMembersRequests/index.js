import { Avatar } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function GroupMembersRequests({
	deleteGroupRequest = () => {},
	approveGroupRequest = () => {},
	group_members = [],
	partner_users = [],
}) {
	const members = partner_users.filter((x) => group_members.includes(x.user_id));

	return (
		<div>
			{!isEmpty(members) && <div className={styles.conversation_title}>Group Requests</div>}
			{members.map((user) => (
				<div className={styles.content} key={user}>
					<Avatar
						src="https://www.w3schools.com/howto/img_avatar.png"
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
					<div className={styles.mark_status}>
						<IcCFtick className={styles.icon} onClick={() => approveGroupRequest(user.user_id)} />
						<IcCFcrossInCircle className={styles.icon} onClick={() => deleteGroupRequest(user.user_id)} />
					</div>
				</div>
			))}
		</div>
	);
}

export default GroupMembersRequests;
