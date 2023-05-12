import { IcMArrowDown, IcMCallnotconnected } from '@cogoport/icons-react';
import { useState } from 'react';

import { ICON_MAPPING } from '../../configurations/group-call-controls';

import styles from './styles.module.css';

const callMapping = {
	answered: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/phone_in_talk.png"
		alt="answered"
		className={styles.icon_styles_attendee}
	/>,
	not_connected: <IcMCallnotconnected fill="#EE3425" className={styles.icon_styles_attendee} />,
};

function SingleAttendee({ eachAttendee }) {
	const { agentName = '', status = '', live_call_action_type = '', id = '' } = eachAttendee || {};
	const ActionIcon = ICON_MAPPING[live_call_action_type] || null;
	const callIcon = callMapping[status] || null;
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

function Attendees({ attendees = [] }) {
	const [showAttendees, setShowAttendees] = useState(false);
	return (
		<div className={styles.container}>
			<div
				className={styles.header_flex}
				tabIndex={0}
				role="button"
				onClick={() => setShowAttendees((p) => !p)}
			>
				<div
					className={styles.conference_header}
				>
					Conference call
					<span>
						(
						{attendees.length || 0}
						)
					</span>
				</div>
				<IcMArrowDown
					className={styles.icon_styles}
					style={{ '--deg': showAttendees ? 'rotate(180deg)' : 'rotate(0deg)' }}
				/>
			</div>
			<div
				className={styles.attendees_div}
				style={{ '--height': showAttendees ? '95%' : '0%' }}
			>
				{showAttendees && [...(attendees || [])].reverse().map((eachAttendee) => (
					<SingleAttendee key={eachAttendee?.id} eachAttendee={eachAttendee} />
				))}
			</div>
		</div>
	);
}
export default Attendees;
