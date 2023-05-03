import { cl, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';

import MessageBody from '../MessageBody';
import RepliedMessage from '../RepliedMessage';

import styles from './styles.module.css';

function ReceiveDiv({
	eachMessage = {},
	canRaiseTicket = true,
	ticketPopoverContent = () => {},
	user_name = '',
}) {
	const {
		message_type = 'text',
		created_at = '',
		response = {},
	} = eachMessage;
	const { reply_metadata = {} } = response || {};

	const date = created_at && format(new Date(created_at), 'dd MMM YYYY, HH:mm');
	const hasRepliedMessage = !isEmpty(reply_metadata);

	return (
		<div className={styles.container}>
			<div className={styles.time_stamp}>
				{date && date}
			</div>
			<div className={cl`${message_type === 'contacts' ? '' : styles.receive_message_container} 
			${hasRepliedMessage ? styles.replied_messages : ''}`}
			>
				{hasRepliedMessage && (
					<RepliedMessage user_name={user_name} reply_metadata={reply_metadata} />
				)}
				{canRaiseTicket && (
					<Tooltip placement="right" content={ticketPopoverContent(eachMessage)} interactive>
						<div className={styles.flex_div}>
							<IcMOverflowDot className={styles.hamburger_styles} />
						</div>
					</Tooltip>
				)}
				<div className={styles.message_div}>
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
