import { Modal } from '@cogoport/components';
import { IcMArrowRight, IcMRefresh } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListCogooneSchedules from '../../../../hooks/useListCogooneSchedules';
import getFormatedEventsData from '../../../../utils/getFormatedEventsData';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({ setEventCalendar = () => {}, firestore = {} }) {
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
		<Modal
			scroll={false}
			show
			onClose={() => setEventCalendar(false)}
			showCloseIcon={false}
			placement="bottom-right"
			className={styles.modal_container}
		>
			<div
				role="presentation"
				className={styles.close_calender}
				onClick={() => setEventCalendar(false)}
			>
				<IcMArrowRight
					className={styles.right_arrow}
					fill="#fff"
				/>
			</div>
			<div
				role="presentation"
				className={styles.default_state}
				onClick={() => setMonth(new Date())}
			>
				<IcMRefresh width={18} height={18} />
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
						firestore={firestore}
					/>
				</div>
				<div className={styles.calendar}>
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
		</Modal>

	);
}

export default CalendarModal;
