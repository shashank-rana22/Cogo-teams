import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FORMAT_TYPE } from '../../constants';
import useRenderCalender from '../../utils/renderCalender';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

const DAY_NUMBER = 1;
const WEEK_DAY_NUMBER = 6;
const MIN_NO_OF_DAYS = 30;
const SCROLL_DURATION_DELAY = 500;
const MIN_PAGE_NUMBER = 1;
const REACH_BOTTOM = 0;

function Calendar(props) {
	const {
		timeline = '',
		calendarData = [],
		setCalendarData = () => {},
		selectedItem = {},
		setSelectedItem = () => {},
		setSelectedDate = () => {},
	} = props || {};

	const calendarRef = useRef();
	const scrollHandleRef = useRef(null);

	const [pagination, setPagination] = useState(MIN_PAGE_NUMBER);

	const {
		calcDate,
		calcMonth,
		calcWeek,
	} = useRenderCalender();

	const handleScroll = () => {
		const { scrollLeft } = calendarRef.current;
		if (scrollLeft <= REACH_BOTTOM) {
			if (scrollHandleRef.current) {
				scrollHandleRef.current = false;
				setPagination((prev) => prev + MIN_PAGE_NUMBER);
				setTimeout(() => {
					scrollHandleRef.current = true;
				}, SCROLL_DURATION_DELAY);
			}
		}
	};

	const loadData = useCallback(({ func }) => {
		const NEW_DATA = [];

		for (let i = 0; i < pagination * MIN_NO_OF_DAYS; i += DAY_NUMBER) {
			NEW_DATA.push(func(i));
		}

		const formatSubLabel = (item) => formatDate({
			date       : item,
			formatType : 'date',
			dateFormat : FORMAT_TYPE[timeline]?.subLabel,
		});

		const DATA = NEW_DATA.map((item, iterator) => {
			const startDate = new Date(item);
			const endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + WEEK_DAY_NUMBER);

			let subLabel = '';
			if (timeline === 'week') {
				subLabel = `${formatSubLabel(item)} to ${formatSubLabel(endDate)}`;
			} else {
				subLabel = formatSubLabel(item);
			}

			return {
				key   : `cal-${timeline}-${pagination}-${iterator}`,
				label : formatDate({
					date       : item,
					formatType : 'date',
					dateFormat : FORMAT_TYPE[timeline]?.label,
				}),
				subLabel,
				date: new Date(item),
				endDate,
			};
		});
		setCalendarData(DATA);
	}, [pagination, setCalendarData, timeline]);

	const doPagination = useCallback(() => {
		setCalendarData([]);
		if (timeline === 'day') {
			loadData({ func: calcDate });
		} else if (timeline === 'month') {
			loadData({ func: calcMonth });
		} else loadData({ func: calcWeek });
	}, [setCalendarData, timeline, loadData, calcDate, calcMonth, calcWeek]);

	useEffect(() => {
		doPagination();
	}, [doPagination, pagination]);

	useEffect(() => {
		scrollHandleRef.current = true;
		setSelectedItem(new Date());
		setPagination(MIN_PAGE_NUMBER);
	}, [setSelectedItem, timeline]);

	return (
		<div className={styles.calendar}>
			<button className={styles.nav_btn} disabled>
				<IcMArrowDoubleRight />
			</button>
			<div
				ref={calendarRef}
				onScroll={handleScroll}
				className={styles.calendar_entity}
			>
				<CalendarEntity
					calendarData={calendarData}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					pagination={pagination}
					setPagination={setPagination}
					timeline={timeline}
					addPagination={(val) => setPagination(val)}
					setSelectedDate={setSelectedDate}
				/>
			</div>
			<button disabled className={styles.nav_btn}>
				<IcMArrowDoubleLeft />
			</button>
		</div>
	);
}
export default Calendar;
