import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import { ICON_MAPPING, CALL_MAPPING } from '../../configurations/group-call-controls';

import styles from './styles.module.css';

function SingleAttendee({ eachAttendee }) {
	const { agentName = '', status = '', live_call_action_type = '' } = eachAttendee || {};
	const ActionIcon = ICON_MAPPING[live_call_action_type] || null;
	const { icon:CallIcon, fill } = CALL_MAPPING[status] || {};
	return (
		<div className={styles.attendee_flex}>
			<div className={styles.common_flex}>
				{ActionIcon && <ActionIcon className={styles.icon_styles_attendee} fill="#4f4f4f" />}
				<div className={styles.name}>{agentName}</div>
			</div>
			{CallIcon ? (
				<CallIcon
					fill={fill}
					className={styles.icon_styles_attendee}
				/>
			) : <div className={styles.connecting_text}>connecting...</div>}
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
					<SingleAttendee eachAttendee={eachAttendee} />
				))}
			</div>
		</div>
	);
}
export default Attendees;
