import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FORMAT_TYPE } from '../../constants';
import useRenderCalender from '../../hooks/useRenderCalender';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

const NUMBER_OF_ELEMENTS = 30;
const DEFAULT_DATE_OF_MONTH = 1;
const WEEK_LAST_NUMBER = 6;
const PAGE_NUMBER = 1;
const SCROLL_DURATION_DELAY = 500;

function Calendar({ props = {} }) {
	const {
		timeline = '',
		calendarData = [],
		setCalendarData = () => {},
		selectedItem = {},
		setSelectedItem = () => {},
		setSelectedDate = () => {},
	} = props || {};

	const [pagination, setPagination] = useState(PAGE_NUMBER);

	const calendarRef = useRef();
	const scrollHandleRef = useRef(null);

	const {
		calcDate,
		calcMonth,
		calcWeek,
	} = useRenderCalender();

	const processData = useCallback((func) => {
		const NEW_DATA = Array.from(
			{ length: (pagination * NUMBER_OF_ELEMENTS) },
			(_, i) => func(i),
		);
		const DATA = NEW_DATA.reverse().map((item, iterator) => ({
			key      : `cal-${timeline}-${pagination}-${iterator}`,
			label    : format(item, FORMAT_TYPE[timeline]?.label),
			subLabel : format(item, FORMAT_TYPE[timeline]?.subLabel),
			date     : new Date(item),
		}));
		setCalendarData(DATA.reverse());
	}, [pagination, setCalendarData, timeline]);

	const loadWeeks = useCallback(() => {
		const NEW_DATA = [];

		for (let i = 0; i < pagination * NUMBER_OF_ELEMENTS; i += DEFAULT_DATE_OF_MONTH) {
			NEW_DATA.push(calcWeek(i));
		}

		const DATA = NEW_DATA.map((item, iterator) => {
			const startDate = new Date(item);
			const endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + WEEK_LAST_NUMBER);

			return {
				key      : `cal-${timeline}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[timeline].label),
				subLabel : `${format(
					item,
					FORMAT_TYPE[timeline].subLabel,
				)} to ${format(endDate, FORMAT_TYPE[timeline].subLabel)}`,
				date: new Date(item),
				endDate,
			};
		});
		setCalendarData(DATA);
	}, [calcWeek, pagination, setCalendarData, timeline]);

	const handleScroll = () => {
		const { scrollLeft } = calendarRef.current;

		if (scrollLeft <= GLOBAL_CONSTANTS.zeroth_index) {
			if (scrollHandleRef.current) {
				scrollHandleRef.current = false;
				setPagination((prev) => prev + DEFAULT_DATE_OF_MONTH);
				setTimeout(() => {
					scrollHandleRef.current = true;
				}, SCROLL_DURATION_DELAY);
			}
		}
	};

	const doPagination = useCallback(() => {
		setCalendarData([]);
		if (timeline === 'day') processData(calcDate);
		else if (timeline === 'month') processData(calcMonth);
		else loadWeeks();
	}, [setCalendarData, timeline, processData, calcDate, calcMonth, loadWeeks]);

	useEffect(() => {
		doPagination();
	}, [doPagination, pagination]);

	useEffect(() => {
		scrollHandleRef.current = true;
		setSelectedItem(new Date());
		setPagination(PAGE_NUMBER);
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
			<button disabled className={`${styles.nav_btn}`}>
				<IcMArrowDoubleLeft />
			</button>
		</div>
	);
}
export default Calendar;
