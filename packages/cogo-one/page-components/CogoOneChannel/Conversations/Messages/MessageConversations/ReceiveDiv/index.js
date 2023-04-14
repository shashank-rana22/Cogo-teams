import { cl, Tooltip } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import MessageBody from '../../../../../../common/MessageBody';

import styles from './styles.module.css';

function ReceiveDiv({
	eachMessage = {},
	canRaiseTicket = true,
	ticketPopoverContent = () => {},
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
		</div>
	);
}
export default ReceiveDiv;
