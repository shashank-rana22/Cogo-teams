import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FORMAT_TYPE } from '../../constants';
import useRenderCalender from '../../utils/renderCalender';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

const CONSTANT_ONE = 1;
const CONSTANT_SIX = 6;
const CONSTANT_THIRTY = 30;
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

	const calendarRef = useRef();
	const scrollHandleRef = useRef(null);

	const [pagination, setPagination] = useState(CONSTANT_ONE);

	const {
		calcDate,
		calcMonth,
		calcWeek,
	} = useRenderCalender();

	const handleScroll = () => {
		const { scrollLeft } = calendarRef.current;

		if (scrollLeft <= GLOBAL_CONSTANTS.zeroth_index) {
			if (scrollHandleRef.current) {
				scrollHandleRef.current = false;
				setPagination((prev) => prev + CONSTANT_ONE);
				setTimeout(() => {
					scrollHandleRef.current = true;
				}, SCROLL_DURATION_DELAY);
			}
		}
	};

	const loadData = useCallback((func) => {
		const NEW_DATA = [];

		for (let i = 0; i < pagination * CONSTANT_THIRTY; i += CONSTANT_ONE) {
			NEW_DATA.push(func(i));
		}

		const formatSubLabel = (item) => format(item, FORMAT_TYPE[timeline]?.subLabel);

		const DATA = NEW_DATA.map((item, iterator) => {
			const startDate = new Date(item);
			const endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + CONSTANT_SIX);

			let subLabel = '';
			if (timeline === 'week') {
				subLabel = `${formatSubLabel(item)} to ${formatSubLabel(endDate)}`;
			} else {
				subLabel = formatSubLabel(item);
			}

			return {
				key   : `cal-${timeline}-${pagination}-${iterator}`,
				label : format(item, FORMAT_TYPE[timeline]?.label),
				subLabel,
				date  : new Date(item),
				endDate,
			};
		});
		setCalendarData(DATA);
	}, [pagination, setCalendarData, timeline]);

	const doPagination = useCallback(() => {
		setCalendarData([]);
		if (timeline === 'day') {
			loadData(calcDate);
		} else if (timeline === 'month') {
			loadData(calcMonth);
		} else loadData(calcWeek);
	}, [setCalendarData, timeline, loadData, calcDate, calcMonth, calcWeek]);

	useEffect(() => {
		doPagination();
	}, [doPagination, pagination]);

	useEffect(() => {
		scrollHandleRef.current = true;
		setSelectedItem(new Date());
		setPagination(CONSTANT_ONE);
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
