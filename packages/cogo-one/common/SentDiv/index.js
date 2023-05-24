import { cl } from '@cogoport/components';
import { IcMTick, IcMDoubleTick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import { LOGO_URL } from '../../constants';
import MessageBody from '../MessageBody';

import FooterItems from './FooterItems';
import styles from './styles.module.css';

function SentDiv({
	eachMessage = {},
	messageStatus = false,
}) {
	const {
		message_type = 'text',
		created_at = '',
		response,
		send_by = '',
		session_type = 'bot',
		message_status = '',
	} = eachMessage;

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');
	const adminStyles = !!(send_by || session_type === 'admin') || false;
	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by
					{' '}
					{send_by || (session_type === 'admin' ? 'kam' : 'bot')}
					,
					<span className={styles.time_stamp}>{date}</span>
				</div>

				<div className={styles.styled_div}>
					<div className={cl`${styles.receive_message_container} 
						${adminStyles ? styles.admin_message_container : ''}`}
					>
						<MessageBody
							response={response}
							message_type={message_type}
							message_status={message_status}
						/>
						<div
							className={styles.message_tick_container}
						>
							{((message_status === 'seen') || messageStatus
								? <IcMDoubleTick fill="#0000FF" /> : <IcMTick />)}
						</div>

					</div>
					<FooterItems response={response} />
				</div>
			</div>
			<img
				src={LOGO_URL[adminStyles ? 'admin' : 'bot']}
				alt="KAM"
				className={styles.user_logo}
			/>
		</div>
	);
}
export default SentDiv;
