import { cl } from '@cogoport/components';
import { format } from '@cogoport/utils';
import {
	// useCallback,
	useEffect,
	// useState,
	useRef,
} from 'react';

import styles from './styles.module.css';

const CONSTANT_ZERO = 0;
const CONSTANT_ONE = 1;
// const INTERSECTION_OPTIONS = {
// 	root       : null,
// 	rootMargin : '0px',
// 	threshold  : [CONSTANT_ONE],
// };
const CONSTANT_TWENTY_NINE = 29;
// const CONSTANT_FIFTY_NINE = 59;
// const CONSTANT_FIVE_HUNDRED = 500;
// const CONSTANT_THOUSAND = 1000;

export function CalendarEntity(
	{
		selectedItem = {},
		setSelectedItem = () => {},
		calendarData = [],
		timeline = 'day',
	// addPagination,
	},
) {
	// const [offset, setOffset] = useState(CONSTANT_TWENTY_NINE);
	// const [leftShift, setLeftShift] = useState(CONSTANT_ZERO);
	//

	const isWeek = timeline === 'week';
	// let leftCount = 0;
	// const calendarRef = useRef();
	const leftEnd = useRef();
	const middle = useRef();
	const end = useRef();

	// const leftShift = useCallback(
	// 	() => {
	// 		leftCount += 1;
	// 		if (leftCount > 4 && leftCount % 2 === 0) {
	// 			addPagination(Math.floor((leftCount - 4) / 2));
	// 		} else if (leftCount > 4) {
	// 			setTimeout(() => {
	// 				middle?.current?.scrollIntoView({
	// 					behavior : 'instant',
	// 					block    : 'nearest',
	// 					inline   : 'start',
	// 				});
	// 			}, 500);
	// 		}
	// 	},
	// 	[],
	// );

	useEffect(() => {
		// setOffset(CONSTANT_TWENTY_NINE);
		// if (typeof window !== 'undefined') {
		// 	const leftObserver = new window.IntersectionObserver(leftShift, INTERSECTION_OPTIONS);
		// 	setTimeout(() => {
		// 		if (leftEnd.current)leftObserver.observe(leftEnd.current);
		// 		end?.current?.scrollIntoView({
		// 			behavior : 'smooth',
		// 			block    : 'nearest',
		// 			inline   : 'end',
		// 		});
		// 	}, CONSTANT_FIVE_HUNDRED);
		// 	setTimeout(() => {
		// 		setOffset(CONSTANT_FIFTY_NINE);
		// 	}, CONSTANT_THOUSAND);
		// }
		middle?.current?.scrollIntoView({
			behavior : 'smooth',
			block    : 'nearest',
			inline   : 'end',
		});
		console.log('calendarData', calendarData);
	}, [calendarData, timeline]);

	return (
		<div
			// onScroll={handleScroll}
			// ref={calendarRef}
			className={cl`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}
		>
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
							{index === CONSTANT_ZERO && (
								<div
									ref={leftEnd}
									onClick={() => setSelectedItem(date)}
									className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
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

							{index > CONSTANT_ZERO
							&& (index < CONSTANT_TWENTY_NINE)
							&& index !== calendarData.length - CONSTANT_ONE
							&& (
								<div
									key={key}
									onClick={() => setSelectedItem(date)}
									className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
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
								index === CONSTANT_TWENTY_NINE && index !== calendarData.length - CONSTANT_ONE

							&& (
								<div
									ref={middle}
									onClick={() => setSelectedItem(date)}
									className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
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
								index > CONSTANT_TWENTY_NINE && index !== calendarData.length - CONSTANT_ONE

							&& (
								<div
									onClick={() => setSelectedItem(date)}
									className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
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
								index === calendarData.length - CONSTANT_ONE

							&& (
								<div
									ref={end}
									onClick={() => setSelectedItem(date)}
									className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
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
