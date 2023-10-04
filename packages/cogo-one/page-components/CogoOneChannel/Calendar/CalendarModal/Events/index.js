import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPlusInCircle, IcMCancel } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import CreateEvent from './CreateEvent';
import styles from './styles.module.css';
import UserEvents from './UserEvents';

const ZERO_COUNT = 0;

function Events({
	addEvents = true, setAddEvents = () => {}, selectedEventData = {},
	getEvents = () => {},
	month = '',
	handleUpdatedState = () => {},
	setActiveTab = () => {},
	activeTab = '',
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
	const { start = '' } = selectedEventData || {};
	const eventsCount = selectedEventData?.eventsList?.length || ZERO_COUNT;

	const date = formatDate({
		date       : start || new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM dd, YYYY'],
		formatType : 'date',
		separator  : ',',
	});

	const activeMonth = formatDate({
		date       : month || new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMM yyyy'],
		formatType : 'date',
		separator  : ',',
	});

	const ACTIVE_COMPONENT = {
		true  : UserEvents,
		false : CreateEvent,
	};

	const ActiveComponent = ACTIVE_COMPONENT[addEvents];

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
					<div className={styles.title}>
						Total Events
					</div>
					<div className={styles.count}>
						{eventsCount}
					</div>
				</div>
			) : null}

			<div className={cl`${styles.container} ${!addEvents ? styles.cancel_events : styles.add_events}`}>
				{addEvents ? (
					<div className={styles.selectable_date}>
						{activeTab === 'schedules' ? date : activeMonth}
					</div>
				) : (
					<div className={styles.sedual_event}>
						Schedule
						{' '}
						{startCase(eventDetails?.category)}
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
					handleUpdatedState={handleUpdatedState}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
				/>

				<div className={styles.footer}>
					{addEvents ? <IcMPlusInCircle fill="#034AFD" /> : <IcMCancel fill="#034AFD" />}
					<div
						className={styles.text}
						role="presentation"
						onClick={() => {
							setEventDetails((prevEventDetails) => ({
								...prevEventDetails,
								category   : 'event',
								event_type : 'call_customer',
							}));
							setAddEvents((prev) => !prev);
							handleClose();
						}}
					>
						{addEvents ? 'Add Reminder' : 'Cancel'}
					</div>
				</div>
			</div>
		</>
	);
}

export default Events;
