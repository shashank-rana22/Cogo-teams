import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import SingleAttendee from './SingleAttendee';
import styles from './styles.module.css';

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
