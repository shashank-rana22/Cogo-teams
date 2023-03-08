import { format } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

export function CalendarEntity({
	selectedItem,
	setSelectedItem,
	calendarData,
	timeline,
	addPagination,
}) {
	const [offset, setOffset] = useState(29);
	const intersectionOptions = {
		root       : null,
		rootMargin : '0px',
		threshold  : [1],
	};

	const isWeek = timeline === 'week';
	let leftCount = 0;
	const calendarRef = useRef();
	const leftEnd = useRef();
	const middle = useRef();

	function leftShift() {
		leftCount += 1;
		if (leftCount > 4 && leftCount % 2 === 0) {
			addPagination(Math.floor((leftCount - 4) / 2));
		} else if (leftCount > 4) {
			setTimeout(() => {
				middle?.current?.scrollIntoView({
					behavior : 'instant',
					block    : 'nearest',
					inline   : 'start',
				});
			}, 500);
		}
	}
	useEffect(() => {
		setOffset(29);
		if (typeof window !== 'undefined') {
			const leftObserver = new window.IntersectionObserver(leftShift, intersectionOptions);
			setTimeout(() => {
				if (leftEnd.current)leftObserver.observe(leftEnd.current);
				middle?.current?.scrollIntoView({
					behavior : 'smooth',
					block    : 'nearest',
					inline   : 'end',
				});
			}, 500);
			setTimeout(() => {
				setOffset(59);
			}, 1000);
		}
	}, [timeline]);

	return (
		<div ref={calendarRef} className={`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}>
			{
				calendarData?.map(({ label, subLabel, key, date, endDate }, index) => {
					let isDateEqual;
					if (timeline === 'day') {
						isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
					} else if (timeline === 'week') {
						isDateEqual = (selectedItem.getTime() >= date.getTime())
						&& (selectedItem.getTime() <= endDate?.getTime());
					} else if (timeline === 'month') {
						isDateEqual = format(selectedItem, 'MMM YYYY') === format(date, 'MMM YYYY');
					}

					return (
						<>
							{index === 0 && (
								<div
									ref={leftEnd}
									onClick={() => setSelectedItem(date)}
									className={`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
									role="presentation"
								>
									<div className={styles.day_hours1}>
										{label}
									</div>
									<div className={styles.day_hours2}>
										{subLabel}
									</div>
								</div>
							)}

							{index > 0 && (index < offset) && 								(
								<div
									key={key}
									onClick={() => setSelectedItem(date)}
									className={`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
									role="presentation"
								>
									<div className={styles.day_hours1}>
										{label}
									</div>
									<div className={styles.day_hours2}>
										{subLabel}
									</div>
								</div>
							)}
							{
								index === offset

							&& (
								<div
									ref={middle}
									onClick={() => setSelectedItem(date)}
									className={`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
									role="presentation"
								>
									<div className={styles.day_hours1}>
										{label}
									</div>
									<div className={styles.day_hours2}>
										{subLabel}
									</div>
								</div>
							)
							}
							{
								index > offset

							&& (
								<div
									onClick={() => setSelectedItem(date)}
									className={`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
									role="presentation"
								>
									<div className={styles.day_hours1}>
										{label}
									</div>
									<div className={styles.day_hours2}>
										{subLabel}
									</div>
								</div>
							)
							}
						</>
					);
				})
			}
		</div>
	);
}
