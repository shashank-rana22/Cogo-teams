/* eslint-disable no-magic-numbers */
/* eslint-disable custom-eslint/import-from-react */
import moment from 'moment';
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomCard from './CustomCard';
import styles from './styles.module.css';

const localizer = momentLocalizer(moment);

function BgCalender({ setSelectedEventData = () => {} }) {
	const myEventsList = [
		{

			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'sanmit',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'sandeep',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
			],

			start : new Date(2023, 8, 15, 9, 0),
			end   : new Date(2023, 8, 15, 10, 30),
		},
		{

			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need ',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this ',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiram',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
			],

			start : new Date(2023, 8, 22, 9, 0),
			end   : new Date(2023, 8, 22, 10, 30),
		},
		{

			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'sanmit',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment ',
					import         : true,
				},
			],

			start : new Date(2023, 8, 28, 9, 0),
			end   : new Date(2023, 8, 28, 10, 30),
		},
	];

	const [myEvents, setEvents] = useState({});

	const handleSelectSlot = useCallback(
		({ start, end }) => {
			setEvents({ start, end });
		},
		[setEvents],
	);

	const handleEventClick = (event) => {
		setSelectedEventData(event);
	};

	const customDayPropGetter = (date) => {
		const currentDate = date?.getDate();
		const currentMonth = date?.getMonth();
		const selectedDate = myEvents?.start?.getDate();
		const selectedMonth = myEvents?.start?.getMonth();
		const showSelectedDate = currentDate === selectedDate && currentMonth === selectedMonth;
		// const showDefaultDate = currentDate === new Date().getDate();

		if (showSelectedDate) {
			return {
				// className : styles.specialDay,
				style: {
					border       : 'solid 1.5px #034AFD',
					borderRadius : '2px',
				},
			};
		}

		// if (!showSelectedDate && showDefaultDate) {
		// 	return {
		// 		// className : styles.specialDay,
		// 		style: {
		// 			border       : 'solid 1.5px #034AFD',
		// 			borderRadius : '2px',
		// 		},
		// 	};
		// }

		return {};
	};

	const { components } = useMemo(
		() => ({
			components: {
				event: CustomCard,
			},
			defaultDate: new Date(2015, 3, 7),
		}),
		[],
	);

	return (

		<div className={styles.container}>
			<Calendar
				// localizer={localizer}
				// events={myEventsList}
				// startAccessor="start"
				// endAccessor="end"
				// style={{ height: 640, width: 630 }}
				// components={{
				// 	event: EventDetails,
				// }}
				// onSelectEvent={handleEventClick} // Handle event click, if needed
				// onSelectSlot={handleSelectSlot} // Handle slot selection (date click)
				// selectable // Enables selecting slots (dates)
				// selected={new Date('Wed Sep 20 2023 00:00:00 GMT+0530 (India Standard Time)')}
				localizer={localizer}
				events={myEventsList}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 600, width: 630 }}
				// components={{
				// 	event: CustomCard,
				// }}
				selectable
				components={components}
				onSelectEvent={handleEventClick}
				onSelectSlot={handleSelectSlot}
				dayPropGetter={customDayPropGetter}
			/>
		</div>
	);
}

export default BgCalender;
