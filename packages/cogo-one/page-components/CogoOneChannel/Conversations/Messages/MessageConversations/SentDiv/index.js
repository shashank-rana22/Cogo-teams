/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

import MessageBody from '../../../../../../common/MessageBody';
import { LOGO_URL } from '../../../../../../constants';

import styles from './styles.module.css';

function SentDiv({
	eachMessage = {},
}) {
	const {
		message_type = 'text',
		created_at = '',
		response,
		send_by = '',
		session_type = 'bot',
	} = eachMessage;

	const { btns = [] } = response;

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by
					{' '}
					{session_type === 'admin' ? send_by || 'kam' : send_by || 'bot'}
					,
					<span className={styles.time_stamp}>{date}</span>
				</div>

				<div className={styles.styled_div}>
					<div className={cl`${styles.receive_message_container} 
						${session_type === 'admin' ? styles.admin_message_container : ''}`}
					>
						<MessageBody
							response={response}
							message_type={message_type}
						/>
					</div>

					{!isEmpty(btns) && (
						<div className={styles.btns_container}>
							{(btns || []).map((eachbtn) => <div className={styles.btn}>{eachbtn}</div>)}
						</div>
					) }
				</div>
			</div>
			<img
				src={LOGO_URL[session_type || 'bot']}
				alt="KAM"
				className={styles.user_logo}
			/>
		</div>
	);
}
export default SentDiv;
