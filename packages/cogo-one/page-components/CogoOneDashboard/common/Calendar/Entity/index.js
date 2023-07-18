import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';
import {
	// useCallback,
	useEffect,
	// useState,
	useRef,
} from 'react';

import styles from './styles.module.css';

// const INTERSECTION_OPTIONS = {
// 	root       : null,
// 	rootMargin : '0px',
// 	threshold  : [CONSTANT_ONE],
// };
const THIRTY_DAYS = 30;
const SCROLL_DURATION_DELAY = 300;
const MONTH_NUMBER = 1;
// const CONSTANT_FIFTY_NINE = 59;
// const CONSTANT_FIVE_HUNDRED = 500;
// const CONSTANT_THOUSAND = 1000;

export function CalendarEntity({
	selectedItem = {},
	setSelectedItem = () => {},
	calendarData = [],
	timeline = 'day',
	setSelectedDate = () => {},
	// addPagination,
}) {
	// const [offset, setOffset] = useState(CONSTANT_THIRTY);
	// const [leftShift, setLeftShift] = useState(CONSTANT_ZERO);

	const isWeek = timeline === 'week';
	// let leftCount = 0;
	const calendarRef = useRef();
	const middle = useRef();

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

	const handleClick = (item) => {
		const { date, endDate } = item || {};
		setSelectedItem(item?.date);
		if (timeline === 'day') {
			setSelectedDate({
				startDate : date,
				endDate   : date,
			});
		}
		if (timeline === 'week') {
			setSelectedDate({
				startDate: date,
				endDate,
			});
		}
		if (timeline === 'month') {
			setSelectedDate({
				startDate : date,
				endDate   : new Date(date.getFullYear(), date.getMonth() + MONTH_NUMBER, GLOBAL_CONSTANTS.zeroth_index),
			});
		}
	};

	useEffect(() => {
		setTimeout(() => {
			middle?.current?.scrollIntoView({
				behavior : 'instant',
				block    : 'nearest',
				inline   : 'start',
			});
		}, SCROLL_DURATION_DELAY);
	}, [calendarData, timeline]);

	return (
		<div
			ref={calendarRef}
			className={cl`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}
		>
			{calendarData?.map((item, index) => {
				const { label, subLabel, key, date, endDate } = item || {};

				let isDateEqual;

				if (timeline === 'day') {
					isDateEqual = format(
						selectedItem,
						GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'],
					) === format(date, GLOBAL_CONSTANTS.formats.date['dd MMM YYYY']);
				} else if (timeline === 'week') {
					isDateEqual = (selectedItem.getTime() >= date.getTime())
						&& (selectedItem.getTime() <= endDate?.getTime());
				} else if (timeline === 'month') {
					isDateEqual = format(
						selectedItem,
						GLOBAL_CONSTANTS.formats.date['MMM YYYY'],
					) === format(date, GLOBAL_CONSTANTS.formats.date['MMM YYYY']);
				}

				return (
					<div
						key={key}
						ref={index === Number(calendarData.length - THIRTY_DAYS) ? middle : null}
						onClick={() => handleClick(item)}
						className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
						role="presentation"
					>
						<div className={styles.label}>
							{label}
							{/* {index} */}
						</div>
						<div className={styles.sub_label}>
							{subLabel}
							{/* {Number(calendarData.length - CONSTANT_THIRTY)} */}
						</div>
					</div>
				);
			})}
		</div>
	);
}
