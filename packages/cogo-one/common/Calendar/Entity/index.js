import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

export function CalendarEntity({
	selectedItem,
	setSelectedItem,
	calendarData,
	scroll,
	setScroll,
	resetDiv,
}) {
	const [position, setPosition] = useState(-33.3);

	const calendarRef = useRef();
	useEffect(() => {
		if (scroll === 'right') {
			calendarRef.current.style = `transform: translateX(${position + 33.3}%);
			transition: 1.5s;`;
			setPosition(position + 33.3);
		}
		if (scroll === 'left') {
			calendarRef.current.style = `transform: translateX(${position - 33.3}%);
			transition: 1.5s;`;
			setPosition(position - 33.3);
		}
		setTimeout(() => {
			setScroll('');
		}, 1000);
	}, [scroll]);

	useEffect(() => {
		calendarRef.current.style = 'transform: translateX(-33.3%);';
	}, [resetDiv]);

	return (
		<div ref={calendarRef} className={styles.calendar}>
			{
				calendarData?.map(({ label, subLabel, key }) => (
					<div
						key={key}
						onClick={() => setSelectedItem(key)}
						className={`${styles.dateContainer} ${selectedItem === key ? styles.active : ''}`}
					>
						<div className={styles.dayH1}>
							{label}
						</div>
						<div className={styles.dayH2}>
							{subLabel}
						</div>
					</div>
				))
			}
		</div>
	);
}
