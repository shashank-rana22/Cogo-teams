/* eslint-disable no-magic-numbers */
/* eslint-disable custom-eslint/import-from-react */
import { isEmpty } from '@cogoport/utils';
import moment from 'moment';
import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import useListCogooneSchedules from '../../../../../hooks/useListCogooneSchedules';

import CustomCard from './CustomCard';
import styles from './styles.module.css';

const localizer = momentLocalizer(moment);

function BgCalender({ setSelectedEventData = () => {}, setAddEvents = () => {} }) {
	const { loading = false, data = {}, getEvents = () => {} } = useListCogooneSchedules();
	console.log('loading:', loading);
	console.log('data:', data);

	const myEventsList = [
		{
			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					important      : true,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					important      : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					important      : false,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'sanmit',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					important      : false,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'sandeep',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					important      : true,
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
					important      : false,
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this ',
					important      : true,
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'Lachiram',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment ',
					important      : true,
					start          : new Date(2023, 8, 22, 18, 0),
					end            : new Date(2023, 8, 22, 19, 0),
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
					remarks        : 'need ',
					important      : false,
				},
			],

			start : new Date(2023, 7, 22, 9, 0),
			end   : new Date(2023, 7, 22, 10, 30),
		},
		{

			marked_events: [
				{
					event_category : 'event',
					event_types    : 'call_customer',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment will cancel',
					important      : false,
					start          : new Date(2023, 8, 22, 9, 0),
					end            : new Date(2023, 8, 22, 10, 30),
				},
				{
					event_category : 'event',
					event_types    : 'send_quotation',
					customer       : 'Lachiramnaik',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment',
					important      : false,
					start          : new Date(2023, 8, 22, 18, 0),
					end            : new Date(2023, 8, 22, 19, 0),
				},
				{
					event_category : 'event',
					event_types    : 'other',
					customer       : 'sanmit',
					poc            : 'chandu',
					remarks        : 'need to call this date otherwise shipment ',
					important      : false,
					start          : new Date(2023, 8, 22, 9, 0),
					end            : new Date(2023, 8, 22, 10, 30),
				},
			],
			start : new Date(2023, 8, 28, 9, 0),
			end   : new Date(2023, 8, 28, 10, 30),
		},
	];

	const [myEvents, setEvents] = useState({});

	const handleSelectSlot = (event) => {
		const { start, end } = event || {};
		const events = (myEventsList || []).find((item) => item?.start?.getDate() === start?.getDate());
		setEvents({ start, end });
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
		setSelectedEventData((myEventsList || []).find((item) => item?.start?.getDate() === start?.getDate()));
		e.preventDefault();
		setAddEvents(true);
	};

	const customDayPropGetter = (date) => {
		const currentDate = date?.getDate();
		const currentMonth = date?.getMonth();
		const selectedDate = myEvents?.start?.getDate();
		const selectedMonth = myEvents?.start?.getMonth();
		const showSelectedDate = currentDate === selectedDate && currentMonth === selectedMonth;

		const currentYear = date?.getFullYear();
		const today = new Date();
		const currentYearMonth = today.getFullYear() * 12 + today.getMonth();
		const dateYearMonth = currentYear * 12 + currentMonth;
		const isNotCurrentMonth = currentYearMonth !== dateYearMonth;

		if (isNotCurrentMonth) {
			return {
				onClick: (e) => {
					e.preventDefault();
				},
			};
		}

		if (showSelectedDate) {
			return {
				style: {
					border       : 'solid 1.5px #034AFD',
					borderRadius : '2px',
				},
			};
		}
		return {};
	};

	const eventPropGetter = (event) => {
		const isClickable = event.clickable;

		if (!isClickable) {
			return {
				onClick: (e) => {
					e.preventDefault();
				},
			};
		}
		return {};
	};

	const { components } = useMemo(
		() => ({
			components: {
				event: CustomCard,
			},
		}),
		[],
	);

	const handleMonthChange = (newDate) => {
		const startDate = moment(newDate || new Date()).startOf('month').toDate();
		const endDate = moment(newDate || new Date()).endOf('month').toDate();
		getEvents({ startDate, endDate });
	};

	return (

		<div className={styles.container}>
			<Calendar
				localizer={localizer}
				events={myEventsList}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 600, width: 630 }}
				selectable
				components={components}
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleEventClick}
				dayPropGetter={customDayPropGetter}
				eventPropGetter={eventPropGetter}
				onNavigate={handleMonthChange}
			/>
		</div>
	);
}

export default BgCalender;
