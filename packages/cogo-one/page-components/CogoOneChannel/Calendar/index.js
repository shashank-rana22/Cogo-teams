import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image, dynamic } from '@cogoport/next';
import React, { useState } from 'react';

import styles from './styles.module.css';

const CalendarModal = dynamic(() => import('./CalendarModal'));

function Calendar({ firestore = {} }) {
	const [eventClender, setEventCalendar] = useState(false);

	return (
		<>
			{!eventClender ? (
				<div
					className={styles.calender}
					role="presentation"
					onClick={() => setEventCalendar((prev) => !prev)}
				>
					<div className={styles.icon}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.calendar}
							height={28}
							width={28}
							alt="calender"
						/>
					</div>
					<div className={styles.title}>
						Calendar
					</div>
				</div>
			) : null}

			{eventClender
				? (
					<CalendarModal
						setEventCalendar={setEventCalendar}
						firestore={firestore}
					/>
				)
				: null}

		</>
	);
}

export default Calendar;
