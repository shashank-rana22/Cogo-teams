/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import { throttle } from '@cogoport/utils';
import { format } from '@cogoport/utils';
import { useState, useEffect, useRef, useMemo } from 'react';

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
	timeline,
	addPagination,
}) {
	const animationTime = 1;
	const [position, setPosition] = useState(-33.3);
	const intersectionOptions = {
		root       : null,
		rootMargin : '0px',
		threshold  : [1],
	};

	const isWeek = timeline === 'week';
	let leftCount = 0;
	const offset = 14;
	const calendarRef = useRef();
	const leftEnd = useRef();
	const rightEnd = useRef();
	const middle = useRef();
	const rightMiddle = useRef();

	// function GetNewData(shift) {
	// 	setTimeout(() => {
	// 		setScroll('');
	// 		setPagination(pagination + shift);
	// 	}, (animationTime * 1000) + 400);
	// }

	function leftShift() {
		console.log('leftShift: ');
		leftCount += 1;
		if (leftCount > 2) {
			addPagination(leftCount);
			setTimeout(() => {
				middle.current.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	}

	const request = throttle(() => {
		leftShift();
	}, 1000);

	// useEffect(() => {
	// 	if (scroll === 'right') {
	// 		calendarRef.current.style = `transform: translateX(${position + 33.3}%);
	// 		transition: ${animationTime}s;`;
	// 		setPosition(position + 33.3);
	// 		GetNewData(1);
	// 	}
	// 	if (scroll === 'left') {
	// 		calendarRef.current.style = `transform: translateX(${position - 33.3}%);
	// 		transition: ${animationTime}s;`;
	// 		setPosition(position - 33.3);
	// 		GetNewData(-1);
	// 	}
	// }, [scroll]);

	// useEffect(() => {
	// 	if (resetDiv)calendarRef.current.style = 'transform: translateX(-33.3%);';
	// 	setPosition(-33.3);
	// }, [resetDiv]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			console.log('window defined');
			const leftObserver = new window.IntersectionObserver(() => request(), intersectionOptions);
			setTimeout(() => {
				leftObserver.observe(leftEnd.current);
				middle.current.scrollIntoView({ behavior: 'smooth' });
			}, 1000);
		}
	}, []);

	return (
		<div ref={calendarRef} className={`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}>
			{
				calendarData?.map(({ label, subLabel, key, date }, index) => {
					let isDateEqual;
					if (timeline === 'day') {
						isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
					} else if (timeline === 'week') {
						isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
					} else if (timeline === 'month') {
						isDateEqual = format(selectedItem, 'MMM') === format(date, 'MMM');
					}

					return (
						<>
							{index === 0 && (
								<div
									ref={leftEnd}
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
							)}

							{index > 0 && (index < offset) && 								(
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
							)}
							{
								index === offset

							&& (
								<div
									ref={middle}
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
							)
							}
							{
								index > offset

							&& (
								<div
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
							)
							}
							{/* {
								index > offset && index < offset * 2

							&& (
								<div
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
							)
							} */}
							{/* {
								index === offset * 2

							&& (
								<div
									ref={rightEnd}
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
							)
							} */}
							{/* {
								index > offset * 2

							&& (
								<div
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
							)
							} */}
						</>
					);
				})
			}
		</div>
	);
}
