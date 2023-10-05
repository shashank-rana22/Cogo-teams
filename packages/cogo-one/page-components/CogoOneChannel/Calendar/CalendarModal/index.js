import { cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListCogooneSchedules from '../../../../hooks/useListCogooneSchedules';
import getFormatedEventsData from '../../../../utils/getFormatedEventsData';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({ setEventCalendar = () => {}, eventClender = false }) {
	const [addEvents, setAddEvents] = useState(true);
	const [month, setMonth] = useState(new Date());
	const [myEvents, setMyEvents] = useState({});
	const [activeTab, setActiveTab] = useState('schedules');
	const { data = {}, getEvents = () => {}, loading: schedulesLoading = false } = useListCogooneSchedules();

	const formatedEventsList = getFormatedEventsData({ data });

	const handleSelectSlot = (event) => {
		const { start, end } = event || {};
		setMyEvents({ start, end });
		setActiveTab('schedules');
		setAddEvents(true);
	};

	const handleEventClick = (event, e) => {
		const { start, end } = event || {};
		setMyEvents({ start, end });
		setActiveTab('schedules');
		e.preventDefault();
		setAddEvents(true);
	};

	return (
		<div className={cl`${styles.main_container} ${eventClender ? styles.animate : styles.hide_modal}`}>
			<div>
				<div
					role="presentation"
					className={styles.close_calender}
					onClick={() => setEventCalendar(false)}
				>
					<IcMArrowRight className={styles.right_arrow} fill="#fff" />
				</div>
				<div className={styles.container}>
					<div className={styles.event_list}>
						<Events
							addEvents={addEvents}
							setAddEvents={setAddEvents}
							month={month}
							events={myEvents}
							getEvents={getEvents}
							setActiveTab={setActiveTab}
							activeTab={activeTab}
							formatedEventsList={formatedEventsList}
							schedulesLoading={schedulesLoading}
							setMonth={setMonth}
							setMyEvents={setMyEvents}
						/>
					</div>
					<div className={styles.calendar}>
						<div className={styles.calendar_container}>
							<BgCalender
								setAddEvents={setAddEvents}
								month={month}
								setMonth={setMonth}
								getEvents={getEvents}
								schedulesLoading={schedulesLoading}
								handleSelectSlot={handleSelectSlot}
								handleEventClick={handleEventClick}
								myEvents={myEvents}
								formatedEventsList={formatedEventsList}
								setMyEvents={setMyEvents}
								setActiveTab={setActiveTab}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarModal;
