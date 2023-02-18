/* eslint-disable max-len */
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function ReceiveDiv({
	eachMessage = {},
	activeMessageCard = {},
}) {
	const {
		message_type = 'text',
		created_at = '',
		response: { message = '' } = {},
	} = eachMessage;
	const { name = 'Unknown User' } = activeMessageCard;

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.name}>
					{name}
					,
					<span className={styles.time_stamp}>
						{date}
					</span>
				</div>

				<div className={styles.receive_message_container}>
					{['text', 'template'].includes(message_type)
						? <div dangerouslySetInnerHTML={{ __html: message }} />
						: 'Media' }
				</div>
			</div>
		</div>
	);
}
export default ReceiveDiv;
