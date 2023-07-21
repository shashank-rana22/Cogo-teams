import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';
import {
	useEffect,
	useRef,
} from 'react';

import styles from './styles.module.css';

const CONSTANT_ONE = 1;
const CONSTANT_THIRTY = 30;
const SCROLL_DURATION_DELAY = 300;

export function CalendarEntity({
	selectedItem = {},
	setSelectedItem = () => {},
	calendarData = [],
	timeline = 'day',
	setSelectedDate = () => {},
}) {
	const isWeek = timeline === 'week';
	const middle = useRef();

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
				endDate   : new Date(date.getFullYear(), date.getMonth() + CONSTANT_ONE, GLOBAL_CONSTANTS.zeroth_index),
			});
		}
	};

	const isEqualDate = (date) => format(selectedItem, GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'])
		=== format(date, GLOBAL_CONSTANTS.formats.date['dd MMM YYYY']);

	const isEqualWeek = (date, endDate) => (selectedItem.getTime() >= date.getTime())
	&& (selectedItem.getTime() <= endDate?.getTime());

	const isEqualMonth = (date) => selectedItem.getMonth() === date.getMonth()
	&& selectedItem.getFullYear() === date.getFullYear();

	const checkForActiveItem = (date, endDate) => {
		if (timeline === 'day') {
			return isEqualDate(date);
		} if (timeline === 'week') {
			return isEqualWeek(date, endDate);
		} if (timeline === 'month') {
			return isEqualMonth(date);
		}
		return false;
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
		<div className={cl`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}>
			{calendarData?.map((item, index) => {
				const { label, subLabel, key, date, endDate } = item || {};
				const isDateEqual = checkForActiveItem(date, endDate);
				return (
					<div
						key={key}
						className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
						ref={index === Number(calendarData.length - CONSTANT_THIRTY) ? middle : null}
						onClick={() => handleClick(item)}
						role="presentation"
					>
						<div className={styles.label}>
							{label}
						</div>
						<div className={styles.sub_label}>
							{subLabel}
						</div>
					</div>
				);
			})}
		</div>
	);
}
