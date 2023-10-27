import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPlusInCircle, IcMCancel } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { LABEL } from '../../../../../constants/calenderConstants';

import CreateEvent from './CreateEvent';
import styles from './styles.module.css';
import UserEvents from './UserEvents';

function Events({
	addEvents = true,
	setAddEvents = () => {},
	getEvents = () => {},
	month = '',
	setActiveTab = () => {},
	formatedEventsList = [],
	activeTab = '',
	events = {},
	schedulesLoading = false,
	setMonth = () => {},
	setMyEvents = () => {},
	firestore = {},
}) {
	const [eventDetails, setEventDetails] = useState({
		category   : 'event',
		event_type : 'call_customer',
	});

	const [actionModal, setActionModal] = useState({
		status       : false,
		value        : {},
		actionStatus : '',
	});

	const setDefaultDate = new Date(month).getMonth() === new Date().getMonth();

	const { start : startEvent = setDefaultDate ? new Date() : '' } = events || {};

	const selectedEventData = (formatedEventsList || []).find(
		(item) => (item?.start?.getDate() === startEvent?.getDate?.())
		&& item?.start?.getMonth() === startEvent?.getMonth(),
	);

	const date = formatDate({
		date       : startEvent,
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM dd, YYYY'],
		formatType : 'date',
		separator  : ',',
	});

	const activeMonth = formatDate({
		date       : month || new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM, YYYY'],
		formatType : 'date',
		separator  : ',',
	});

	const ActiveComponent = addEvents ? UserEvents : CreateEvent;

	const handleClose = () => {
		setActionModal((prevEventDetails) => ({
			...prevEventDetails,
			status       : false,
			value        : {},
			actionStatus : '',
		}));
	};

	useEffect(() => {
		setEventDetails((prevEventDetails) => ({
			...prevEventDetails,
			event_type: 'call_customer',
		}));
	}, [eventDetails?.category]);

	return (
		<>
			{addEvents ? (
				<div className={styles.header}>
					Calendar
				</div>
			) : null}

			<div className={cl`${styles.container} ${!addEvents ? styles.cancel_events : styles.add_events}`}>
				{addEvents ? (
					<div className={cl`${styles.selectable_date} ${!date && activeTab === 'schedules'
						? styles.no_selected_date : ''}`}
					>
						{activeTab === 'schedules' ? date : activeMonth}
					</div>
				) : (
					<div className={styles.sedual_event}>
						Schedule
						{' '}
						{LABEL[eventDetails?.category]}
					</div>
				)}

				<ActiveComponent
					selectedEventData={selectedEventData}
					getEvents={getEvents}
					month={month}
					eventDetails={eventDetails}
					setEventDetails={setEventDetails}
					actionModal={actionModal}
					setActionModal={setActionModal}
					updateEventDetails={actionModal?.value}
					setAddEvents={setAddEvents}
					handleClose={handleClose}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					schedulesLoading={schedulesLoading}
					setMonth={setMonth}
					setMyEvents={setMyEvents}
					firestore={firestore}
				/>

				<div className={styles.footer}>
					<Button
						onClick={() => {
							setEventDetails((prevEventDetails) => ({
								...prevEventDetails,
								category   : 'event',
								event_type : 'call_customer',
							}));
							setAddEvents((prev) => !prev);
							handleClose();
							setActiveTab('schedules');
						}}
						themeType={addEvents ? 'primary' : 'secondary'}
						size="md"
					>
						{addEvents ? <IcMPlusInCircle fill="#fff" /> : <IcMCancel fill="#4f4f4f" />}
						<div
							className={styles.text}
							style={{ color: addEvents ? '#fff' : '#4f4f4f' }}
						>
							{addEvents ? 'Add Reminder' : 'Cancel'}
						</div>
					</Button>
				</div>
			</div>
		</>
	);
}

export default Events;
