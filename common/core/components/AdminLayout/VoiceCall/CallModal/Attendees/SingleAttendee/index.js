import { ICON_MAPPING } from '../../../configurations/group-call-controls';
import { CALL_MAPPING } from '../../../constants';

import styles from './styles.module.css';

function SingleAttendee({ eachAttendee }) {
	const { agentName = '', status = '', live_call_action_type = '', id = '' } = eachAttendee || {};
	const ActionIcon = ICON_MAPPING[live_call_action_type] || null;
	const callIcon = CALL_MAPPING[status] || null;

	return (
		<div className={styles.attendee_flex} key={id}>
			<div className={styles.common_flex}>
				{ActionIcon && <ActionIcon className={styles.icon_styles_attendee} fill="#4f4f4f" />}
				<div className={styles.name}>{agentName}</div>
			</div>
			{callIcon || <div className={styles.connecting_text}>connecting...</div>}
		</div>
	);
}

export default SingleAttendee;
