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
	timeline,
	addPagination,
}) {
	console.log('selectedItem', selectedItem);
	const [offset, setOffset] = useState(29);
	const intersectionOptions = {
		root       : null,
		rootMargin : '0px',
		threshold  : [1],
	};

	const isWeek = timeline === 'week';
	let leftCount = 0;
	// const offset = 14;
	const calendarRef = useRef();
	const leftEnd = useRef();
	const middle = useRef();

	// function GetNewData(shift) {
	// 	setTimeout(() => {
	// 		setScroll('');
	// 		setPagination(pagination + shift);
	// 	}, (animationTime * 1000) + 400);
	// }

	function leftShift() {
		leftCount += 1;
		// console.log('leftShift: ', leftCount);
		if (leftCount > 4 && leftCount % 2 === 0) {
			addPagination(Math.floor((leftCount - 4) / 2));
		} else if (leftCount > 4) {
			setTimeout(() => {
				// console.log('scrolling::::::::::::');
				middle?.current?.scrollIntoView({
					behavior : 'instant',
					block    : 'nearest',
					inline   : 'start',
				});
			}, 500);
		}
	}

	// const request = throttle(() => {
	// 	leftShift();
	// }, 3000);

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
		setOffset(29);
		if (typeof window !== 'undefined') {
			// console.log('window defined');
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
				calendarData?.map(({ label, subLabel, key, date }, index) => {
					let isDateEqual;
					if (timeline === 'day') {
						isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
					} else if (timeline === 'week') {
						isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
					} else if (timeline === 'month') {
						isDateEqual = format(selectedItem, 'dd MMM YYYY') === format(date, 'dd MMM YYYY');
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
