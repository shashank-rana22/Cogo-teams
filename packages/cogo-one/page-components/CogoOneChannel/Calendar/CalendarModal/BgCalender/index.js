// eslint-disable-next-line custom-eslint/import-from-react
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import moment from 'moment';
import React, { useMemo, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import getMonthStartAndEnd from '../../../../../utils/getMonthStartAndEnd';

import CustomCard from './CustomCard';
import styles from './styles.module.css';

const localizer = momentLocalizer(moment);

function CustomToolbar({
	label = '', onNavigate = () => {}, setMyEvents = () => {}, setActiveTab = () => {},
}) {
	return (
		<div className="rbc-toolbar">
			<div className={styles.header_container}>
				<div
					role="presentation"
					onClick={() => {
						onNavigate('PREV');
						setMyEvents({});
						setActiveTab('schedules');
					}}
				>
					<IcMArrowLeft className={styles.icon_styles} />
				</div>
				<div className={styles.label}>{label}</div>
				<div
					role="presentation"
					onClick={() => {
						onNavigate('NEXT');
						setMyEvents({});
						setActiveTab('schedules');
					}}
				>
					<IcMArrowRight className={styles.icon_styles} />
				</div>
			</div>
		</div>
	);
}

function BgCalender({
	month = {}, setMonth = () => {},
	getEvents = () => {},
	schedulesLoading = false,
	handleSelectSlot = () => {}, handleEventClick = () => {}, myEvents = {}, formatedEventsList = [],
	setMyEvents = () => {}, setActiveTab = () => {},
}) {
	const customDayPropGetter = (date) => {
		const currentDate = date?.getDate();
		const currentMonth = date?.getMonth();
		const selectedDate = myEvents?.start?.getDate();
		const selectedMonth = myEvents?.start?.getMonth();
		const showSelectedDate = currentDate === selectedDate && currentMonth === selectedMonth;

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

	const { components } = useMemo(
		() => ({
			components: {
				event   : CustomCard,
				toolbar : (props) => (
					<CustomToolbar
						{...props}
						setMyEvents={setMyEvents}
						setActiveTab={setActiveTab}
					/>
				),
			},
		}),
		[setActiveTab, setMyEvents],
	);

	const handleMonthChange = useCallback((newDate) => {
		const { startDate, endDate } = getMonthStartAndEnd({ month: newDate });
		getEvents({ startDate, endDate });
	}, [getEvents]);

	useEffect(() => {
		const currentDate = new Date();
		handleMonthChange(currentDate);
	}, [handleMonthChange]);

	useEffect(() => {
		const { startDate, endDate } = getMonthStartAndEnd({ month });
		getEvents({ startDate, endDate });
	}, [getEvents, month]);

	return (
		<div className={styles.container}>
			<Calendar
				key={month}
				localizer={localizer}
				events={schedulesLoading ? [] : formatedEventsList}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 600, width: 630 }}
				selectable
				components={components}
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleEventClick}
				dayPropGetter={customDayPropGetter}
				onNavigate={(newDate) => {
					setMonth(newDate);
					handleMonthChange(newDate);
				}}
				defaultDate={month}
			/>
		</div>
	);
}

export default BgCalender;
