import { Avatar } from '@cogoport/components';
import { IcCWhatsapp, IcMFacebook, IcMEmail, IcMArrowDown } from '@cogoport/icons-react';

import ConversationContainer from './ConversationContainer';
import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.left_container}>
					<div className={styles.title}>Profile</div>
					<div className={styles.content}>
						<Avatar
							src="https://www.w3schools.com/howto/img_avatar.png"
							alt="img"
							disabled={false}
							size="48px"
						/>
						<div className={styles.name}>John Wick</div>
						<div className={styles.number}>+91 9348630630</div>
						<div className={styles.icon_div}>
							<IcCWhatsapp width={30} height={30} />
							<IcMFacebook width={30} height={30} fill="#1877F2" />
							<IcMEmail width={30} height={30} fill="#E09B3D" />
						</div>
					</div>
				</div>
				<div className={styles.conversation_div}>
					<IcMArrowDown width={16} height={16} className={styles.arrow_down} />
					<div className={styles.conversation_title}>Relevant Conversation (03)</div>
				</div>
				<ConversationContainer />
			</div>
			<RightSideNav />
		</>
	);
}
export default ProfileDetails;
