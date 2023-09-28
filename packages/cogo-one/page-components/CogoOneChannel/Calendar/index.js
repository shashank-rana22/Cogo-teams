import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import CalendarModal from './CalendarModal';
import styles from './styles.module.css';

function Calendar() {
	const [eventClender, setEventValendar] = useState(false);

	return (
		<>
			<div
				className={styles.calender}
				role="presentation"
				onClick={() => setEventValendar(true)}
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
			{eventClender ? <CalendarModal eventClender={eventClender} setEventValendar={setEventValendar} /> : null}
		</>
	);
}

export default Calendar;
