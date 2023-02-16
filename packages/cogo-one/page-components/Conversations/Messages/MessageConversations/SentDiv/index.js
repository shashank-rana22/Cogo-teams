/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function SentDiv({
	eachMessage = {},
}) {
	const {
		message_type = 'text',
		created_at = '',
		response: { message = '' } = {},
		send_by = 'kam',
		session_type = 'bot',
	} = eachMessage;

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by
					{' '}
					{session_type === 'admin' ? send_by : 'bot'}
					,
					<span className={styles.time_stamp}>{date}</span>
				</div>
				<div className={cl`${styles.receive_message_container} ${session_type === 'admin' ? styles.admin_message_container : ''}`}>
					{['text', 'template'].includes(message_type)
						? <div dangerouslySetInnerHTML={{ __html: message }} />
						: 'Media' }
				</div>
			</div>
			<img
				src="https://cogoport-testing.sgp1.digitaloceanspaces.com/10118f395f681ff8ce69dc191c28d45d/XMLID_816_.svg"
				alt="KAM"
			/>
		</div>
	);
}
export default SentDiv;
