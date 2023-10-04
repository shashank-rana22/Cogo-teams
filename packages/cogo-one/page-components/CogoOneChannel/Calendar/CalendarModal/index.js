import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogooneSchedules from '../../../../hooks/useListCogooneSchedules';
import getFormatedEventsData from '../../../../utils/getFormatedEventsData';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({
	setEventCalendar = () => {},
}) {
	const [addEvents, setAddEvents] = useState(true);
	const [month, setMonth] = useState(new Date());
	const [selectedEventData, setSelectedEventData] = useState({});

	const [myEvents, setEvents] = useState({});
	const [activeTab, setActiveTab] = useState('schedules');
	const { data = {}, getEvents = () => {}, loading = false } = useListCogooneSchedules();

	const formatedEventsList = getFormatedEventsData({ data });

	const handleSelectSlot = (event) => {
		const { start, end } = event || {};
		const events = ((formatedEventsList || []).find((item) => (item?.start?.getDate() === start?.getDate())
		&& item?.start?.getMonth() === start?.getMonth()));
		setEvents({ start, end });
		setActiveTab('schedules');
		if (isEmpty(events)) {
			setSelectedEventData({ start, end });
		} else {
			setSelectedEventData(events);
		}
		setAddEvents(true);
	};

	const handleEventClick = (event, e) => {
		const { start, end } = event || {};
		setEvents({ start, end });
		setActiveTab('schedules');
		setSelectedEventData((formatedEventsList || []).find((item) => (item?.start?.getDate() === start?.getDate())
		&& item?.start?.getMonth() === start?.getMonth()));
		e.preventDefault();
		setAddEvents(true);
	};

	const handleUpdatedState = () => {
		if (!loading) {
			const { start } = myEvents;
			const List = getFormatedEventsData({ data });
			const events = ((List || []).find((item) => (item?.start?.getDate() === start?.getDate())
        && item?.start?.getMonth() === start?.getMonth()));
			console.log('events:', events);
		}
	};

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
						setActiveTab={setActiveTab}
						activeTab={activeTab}
						handleUpdatedState={handleUpdatedState}
					/>
				</div>
				<div className={styles.calendar}>
					<div className={styles.calendar_container}>
						<BgCalender
							setSelectedEventData={setSelectedEventData}
							setAddEvents={setAddEvents}
							month={month}
							setMonth={setMonth}
							getEvents={getEvents}
							loading={loading}
							handleSelectSlot={handleSelectSlot}
							handleEventClick={handleEventClick}
							myEvents={myEvents}
							formatedEventsList={formatedEventsList}
							setEvents={setEvents}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarModal;
