import { IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({
	setEventValendar = () => {},
}) {
	const [addEvents, setAddEvents] = useState(true);
	const [selectedEventData, setSelectedEventData] = useState({});

	return (
		<div className={styles.main_container}>
			<div className={styles.close_calender}>
				<IcMCross width={18} height={18} onClick={() => setEventValendar(false)} />
			</div>
			<div className={styles.container}>
				<div className={styles.event_list}>
					<Events addEvents={addEvents} setAddEvents={setAddEvents} selectedEventData={selectedEventData} />
				</div>
				<div className={styles.calendar}>
					<div className={styles.calendar_container}>
						<BgCalender setSelectedEventData={setSelectedEventData} setAddEvents={setAddEvents} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarModal;
