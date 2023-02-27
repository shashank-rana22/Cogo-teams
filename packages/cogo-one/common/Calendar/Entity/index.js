/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import { format } from '@cogoport/utils';
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
	isWeek,
}) {
	const animationTime = 1;
	const [position, setPosition] = useState(-33.3);

	const calendarRef = useRef();

	function GetNewData(shift) {
		setTimeout(() => {
			setScroll('');
			setPagination(pagination + shift);
		}, (animationTime * 1000) + 400);
	}

	useEffect(() => {
		if (scroll === 'right') {
			calendarRef.current.style = `transform: translateX(${position + 33.3}%);
			transition: ${animationTime}s;`;
			setPosition(position + 33.3);
			GetNewData(1);
		}
		if (scroll === 'left') {
			calendarRef.current.style = `transform: translateX(${position - 33.3}%);
			transition: ${animationTime}s;`;
			setPosition(position - 33.3);
			GetNewData(-1);
		}
	}, [scroll]);

	useEffect(() => {
		if (resetDiv)calendarRef.current.style = 'transform: translateX(-33.3%);';
		setPosition(-33.3);
	}, [resetDiv]);

	return (
		<div ref={calendarRef} className={`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}>
			{
				calendarData?.map(({ label, subLabel, key, date }) => {
					const isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
					return (
						<div
							key={key}
							onClick={() => setSelectedItem(format(
								date,
								'dd MMM YYYY',
							))}
							className={`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
						>
							<div className={styles.day_hours1}>
								{label}
							</div>
							<div className={styles.day_hours2}>
								{subLabel}
							</div>
						</div>
					);
				})
			}
		</div>
	);
}
