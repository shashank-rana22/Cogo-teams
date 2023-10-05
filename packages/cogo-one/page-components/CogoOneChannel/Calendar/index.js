import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState, useRef, useEffect } from 'react';

import CalendarModal from './CalendarModal';
import styles from './styles.module.css';

function Calendar() {
	const [eventClender, setEventCalendar] = useState(false);
	const cardRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				cardRef.current
			&& !cardRef.current.contains(event.target)
			&& !eventClender
			) {
				setEventCalendar(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [eventClender]);

	return (
		<>
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
			{eventClender
				? (
					<div ref={cardRef}>
						<CalendarModal eventClender={eventClender} setEventCalendar={setEventCalendar} />
					</div>
				)
				: null}

		</>
	);
}

export default Calendar;
