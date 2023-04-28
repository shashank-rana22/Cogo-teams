import { cl } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

import MessageBody from '../../../../../../common/MessageBody';
import RepliedMessage from '../RepliedMessage';

import styles from './styles.module.css';

function ReceiveDiv({
	eachMessage = {},
	user_name = '',
}) {
	const {
		message_type = 'text',
		created_at = '',
		response = {},
	} = eachMessage;
	const { reply_metadata = {} } = response || {};
	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.time_stamp}>
					{date}
				</div>

				<div className={cl`${message_type === 'contacts' ? '' : styles.receive_message_container}`}>
					{!isEmpty(reply_metadata) && (
						<RepliedMessage user_name={user_name} reply_metadata={reply_metadata} />
					)}
					<MessageBody
						response={response}
						message_type={message_type}
					/>
				</div>
			</div>
		</div>
	);
}
export default ReceiveDiv;
