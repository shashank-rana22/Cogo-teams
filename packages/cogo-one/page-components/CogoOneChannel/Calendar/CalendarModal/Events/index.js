import { DateRangepicker } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import CreateEvent from './CreateEvent';
import styles from './styles.module.css';
import UserEvents from './UserEvents';

function Events({ addEvents = true, setAddEvents = () => {}, selectedEventData = {} }) {
	const [eventDetails, setEventDetails] = useState({
		category   : 'event',
		event_type : 'call_customer',
		event_date : { startDate: new Date(), endDate: new Date() },
	});

	const { start = '' } = selectedEventData || {};

	const date = formatDate({
		date       : start || new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM dd, YYYY'],
		formatType : 'date',
		separator  : ',',
	});

	return (
		<>
			<div className={styles.header}>
				<div className={styles.title}>
					Total Events
				</div>
				<div className={styles.count}>
					123
				</div>
			</div>
			<div className={styles.container}>
				{addEvents ? (
					<div className={styles.selectable_date}>
						{date}
					</div>
				) : (
					<div className={styles.create_event}>
						<div className={styles.create_label}>
							Select Date
						</div>
						<DateRangepicker
							name="date"
							onChange={(val) => setEventDetails((prev) => ({ ...prev, event_date: val }))}
							value={eventDetails?.event_date}
							showTimeSelect
							isClearable={false}
						/>
					</div>
				)}

				{addEvents ? <UserEvents selectedEventData={selectedEventData} /> : (
					<CreateEvent
						eventDetails={eventDetails}
						setEventDetails={setEventDetails}
					/>
				)}

				<div className={styles.footer}>
					<IcMPlusInCircle fill="#034AFD" />
					<div
						className={styles.text}
						role="presentation"
						onClick={() => setAddEvents((prev) => !prev)}
					>
						{addEvents ? 'Add Events' : 'Cancel Event'}
					</div>
				</div>
			</div>
		</>
	);
}

export default Events;
