import { IcMCross } from '@cogoport/icons-react';
import { useEffect } from 'react';

import useGetUnreadMailsCount from '../../../../hooks/useGetLatestMailMessage';

import styles from './styles.module.css';

const NOTIFICATION_DISPLAY_DURATION = 5000;

function MailNotification({
	setShowNotifications = () => {},
	firestore = {},
	viewType = '',
	agentId = '',
	isBotSession = false,
}) {
	const newMessage = useGetUnreadMailsCount({ firestore, viewType, agentId, isBotSession });
	console.log('newMessage:', newMessage);

	useEffect(() => {
		const showMessage = setTimeout(() => {
			setShowNotifications(false);
		}, NOTIFICATION_DISPLAY_DURATION);

		return () => clearTimeout(showMessage);
	}, [setShowNotifications]);

	return (
		<div className={styles.notification_container}>
			<div className={styles.vertical_line} />
			<div className={styles.content}>
				<div className={styles.avatar_section}>
					<div className={styles.name}>
						SR
					</div>
				</div>
				<div className={styles.sender_details}>
					<div className={styles.sender_name}>Sender Name</div>
					<div className={styles.subject}>Subject</div>
					<div className={styles.message}>Message</div>
				</div>
				<div className={styles.cancel_section}>
					<IcMCross
						width={30}
						height={30}
						fill="#309EE3"
						cursor="pointer"
						onClick={() => setShowNotifications(false)}
					/>
				</div>
			</div>
		</div>
	);
}

export default MailNotification;
