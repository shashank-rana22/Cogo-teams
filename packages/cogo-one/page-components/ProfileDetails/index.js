import { Avatar } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';

import ConversationContainer from './ConversationContainer';
import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails() {
	return (
		<div className={styles.profile_div}>
			<div className={styles.container}>
				<div className={styles.title}>Profile</div>
				<div className={styles.content}>
					<Avatar
						src="https://www.w3schools.com/howto/img_avatar.png"
						alt="img"
						disabled={false}
						size="60px"
						className="avatar"
					/>
					<div className={styles.details}>
						<div className={styles.name}>John Wick</div>
						<div className={styles.name}>Product analyst</div>
					</div>
				</div>
				<div className={styles.number_div}>
					<IcMCall className={styles.call_icon} />
					<div className={styles.number}>+91 9348630630</div>
				</div>
				<div className={styles.conversation_title}>Other Channels (03)</div>
				<ConversationContainer />
			</div>
			<RightSideNav />
		</div>
	);
}
export default ProfileDetails;
