import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

export function CalendarEntity({
	selectedItem,
	setSelectedItem,
	calendarData,
	scroll,
	setScroll,
	resetDiv,
	pagination,
	setPagination,
}) {
	const [position, setPosition] = useState(-33.3);

	const calendarRef = useRef();

	function GetNewData(shift) {
		setTimeout(() => {
			setScroll('');
			setPagination(pagination + shift);
		}, 1500);
	}

	useEffect(() => {
		if (scroll === 'right') {
			calendarRef.current.style = `transform: translateX(${position + 33.3}%);
			transition: 1.5s;`;
			setPosition(position + 33.3);
			GetNewData(1);
		}
		if (scroll === 'left') {
			calendarRef.current.style = `transform: translateX(${position - 33.3}%);
			transition: 1.5s;`;
			setPosition(position - 33.3);
			GetNewData(-1);
		}
	}, [scroll]);

	useEffect(() => {
		if (resetDiv)calendarRef.current.style = 'transform: translateX(-33.3%);';
		setPosition(-33.3);
		console.log(position);
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
