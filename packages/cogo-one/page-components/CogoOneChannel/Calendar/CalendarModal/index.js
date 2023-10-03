import { IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListCogooneSchedules from '../../../../hooks/useListCogooneSchedules';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({
	setEventCalendar = () => {},
}) {
	const [addEvents, setAddEvents] = useState(true);
	const [month, setMonth] = useState(new Date());

	const { data = {}, getEvents = () => {}, loading = false } = useListCogooneSchedules();

	const [selectedEventData, setSelectedEventData] = useState({});
	console.log('selectedEventData:', selectedEventData);

	return (
		<div className={styles.main_container}>
			<div className={styles.close_calender}>
				<IcMCross width={18} height={18} onClick={() => setEventCalendar(false)} />
			</div>
			<div className={styles.container}>
				<div className={styles.event_list}>
					<Events
						addEvents={addEvents}
						setAddEvents={setAddEvents}
						selectedEventData={selectedEventData}
						month={month}
						getEvents={getEvents}
					/>
				</div>
				<div className={styles.calendar}>
					<div className={styles.calendar_container}>
						<BgCalender
							setSelectedEventData={setSelectedEventData}
							setAddEvents={setAddEvents}
							month={month}
							setMonth={setMonth}
							eventsData={data}
							getEvents={getEvents}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarModal;
