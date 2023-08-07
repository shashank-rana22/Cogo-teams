import { ICON_MAPPING } from '../../../configurations/group-call-controls';
import { CALL_MAPPING } from '../../../constants';

import styles from './styles.module.css';

function SingleAttendee({ eachAttendee = {} }) {
	const { agent_details = {}, call_status = '', call_type = '', id = '' } = eachAttendee || {};

	const { name = '' } = agent_details || {};

	const ActionIcon = ICON_MAPPING[call_type] || null;
	const CallIcon = CALL_MAPPING[call_status] || null;

	return (
		<div className={styles.attendee_flex} key={id}>
			<div className={styles.common_flex}>
				{ActionIcon && <ActionIcon className={styles.icon_styles_attendee} fill="#4f4f4f" />}
				<div className={styles.name}>{name}</div>
			</div>
			{CallIcon || <div className={styles.connecting_text}>connecting...</div>}
		</div>
	);
}

export default SingleAttendee;
