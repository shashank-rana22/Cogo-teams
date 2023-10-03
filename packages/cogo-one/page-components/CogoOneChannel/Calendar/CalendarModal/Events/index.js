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
}) {
	const [eventDetails, setEventDetails] = useState({
		category   : 'event',
		event_type : 'call_customer',
	});

	const { start = '' } = selectedEventData || {};
	const eventsCount = selectedEventData?.eventsList?.length || ZERO_COUNT;

	const date = formatDate({
		date       : start || new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM dd, YYYY'],
		formatType : 'date',
		separator  : ',',
	});

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
						{date}
					</div>
				) : (
					<div className={styles.sedual_event}>
						Schedule
						{' '}
						{startCase(eventDetails?.category)}
					</div>
				)}

				{addEvents ? <UserEvents selectedEventData={selectedEventData} /> : (
					<CreateEvent
						eventDetails={eventDetails}
						setEventDetails={setEventDetails}
						getEvents={getEvents}
						month={month}
					/>
				)}

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
