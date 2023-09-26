/* eslint-disable no-magic-numbers */
/* eslint-disable custom-eslint/import-from-react */
import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomCard from './CustomCard';
import styles from './styles.module.css';

const localizer = momentLocalizer(moment);

function BgCalender() {
	const myEventsList = [
		{

			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
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
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
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
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
			],

			start : new Date(2023, 8, 28, 9, 0),
			end   : new Date(2023, 8, 28, 10, 30),
		},
		{
			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will calcel',
					import         : true,
				},
			],

			start : new Date(2023, 8, 24, 9, 0),
			end   : new Date(2023, 8, 24, 10, 30),
		},
		{
			marked_events: [
				{
					event_category : 'metting',
					event_types    : 'send_quotation',
					customer       : 'Sandeep',
					poc            : 'Rahul',
					remarks        : 'Need to ask some quations about shipments',
					import         : true,
				},
			],
			start : new Date(2023, 8, 25, 9, 0),
			end   : new Date(2023, 8, 25, 10, 30),
		},
	];

	// function EventDetails({ event = {} }) {
	// 	return <CustomCard event={event} />;
	// }

	const [selectedDate, setSelectedDate] = useState(null);
	console.log('selectedDate:', selectedDate);

	const handleEventClick = (event) => {
		console.log('event:', event);
	// Handle event click, if needed
	};

	const handleSelectSlot = (slotInfo) => {
		setSelectedDate(slotInfo.start); // Set the selected date
	};

	const customDayProp = (date) => {
		if (moment(date).isSame(selectedDate, 'day')) {
			return {
				className: 'selected-date',
			};
		}
		return {};
	};

	const defaultDate = moment('2023-09-01');

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
				style={{ height: 640, width: 630 }}
				components={{
					event: CustomCard,
				}}
				onSelectEvent={handleEventClick}
				onSelectSlot={handleSelectSlot}
				selectable
				selected={selectedDate}
				eventPropGetter={customDayProp}
				defaultDate={defaultDate}
			/>
		</div>
	);
}

export default BgCalender;
