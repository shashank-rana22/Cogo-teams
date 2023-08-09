import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useRef } from 'react';

import checkForActiveItem from '../../../utils/checkForActiveItem';

import styles from './styles.module.css';

const DEFAULT_MONTH_NUMBER = 1;
const MIN_CALENDAR_DATA_LENGTH = 30;
const SCROLL_DURATION_DELAY = 300;

const getTimelineItems = ({ date, endDate }) => {
	const MONTH_END_DATE = new Date(
		date.getFullYear(),
		date.getMonth() + DEFAULT_MONTH_NUMBER,
		GLOBAL_CONSTANTS.zeroth_index,
	);

	const TIMELINE_MAPPING_DATES = {
		day: {
			endDate: date,
		},
		week: {
			endDate,
		},
		month: {
			endDate: MONTH_END_DATE,
		},
	};

	return TIMELINE_MAPPING_DATES;
};

export function CalendarEntity({
	selectedItem = {},
	setSelectedItem = () => {},
	calendarData = [],
	timeline = 'day',
	setSelectedDate = () => {},
}) {
	const middleRef = useRef();

	const isWeek = timeline === 'week';

	const handleClick = ({ item }) => {
		const { date, endDate } = item || {};
		setSelectedItem(item?.date);
		setSelectedDate({
			startDate : date,
			endDate   : getTimelineItems({ date, endDate })[timeline]?.endDate,
		});
	};

	useEffect(() => {
		setTimeout(() => {
			middleRef?.current?.scrollIntoView({
				behavior : 'instant',
				block    : 'nearest',
				inline   : 'start',
			});
		}, SCROLL_DURATION_DELAY);
	}, [calendarData, timeline]);

	return (
		<div className={cl`${styles.calendar} ${isWeek ? styles.week_calendar : ''}`}>
			{(calendarData || []).map((item, index) => {
				const { label, subLabel, key, date, endDate } = item || {};
				const isDateEqual = checkForActiveItem({ date, endDate, timeline, selectedItem });

				return (
					<div
						key={key}
						className={cl`${styles.date_container} ${isDateEqual ? styles.active : ''}`}
						ref={index === Number(calendarData.length - MIN_CALENDAR_DATA_LENGTH) ? middleRef : null}
						onClick={() => handleClick({ item })}
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
