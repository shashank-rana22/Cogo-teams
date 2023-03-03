/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { format } from '@cogoport/utils';

import MessageBody from '../../../../../../common/MessageBody';

import styles from './styles.module.css';

function ReceiveDiv({
	eachMessage = {},
}) {
	const {
		message_type = 'text',
		created_at = '',
		response = {},
	} = eachMessage;

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.time_stamp}>
					{date}
				</div>

				<div className={cl`${message_type === 'contacts' ? '' : styles.receive_message_container}`}>
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
