import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
// import { format } from '@cogoport/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';

// import { FORMAT_TYPE } from '../../configurations/dashboard';
import useRenderCalender from '../../hooks/useRenderCalender';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

const NUMBER_OF_ELEMENTS = 30;
const ELEMENT_SHIFT = 30;
const ADD_ONE = 1;
// const ADD_SIX = 6;

function Calendar({ props = {} }) {
	const {
		timeline = '',
		calendarData = [],
		setCalendarData = () => {},
		selectedItem = {},
		setSelectedItem = () => {},
	} = props || {};

	const [pagination, setPagination] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const calendarRef = useRef();

	const {
		calcDate,
		calcMonth,
		// calcWeek,
	} = useRenderCalender();

	// const processData = useCallback((func) => {
	// 	const NEW_DATA = Array.from(
	// 		{ length: (NUMBER_OF_ELEMENTS + (pagination * NUMBER_OF_ELEMENTS) - pagination) / ADD_ONE },
	// 		(_, i) => func(pagination + i * ADD_ONE),
	// 	);
	// 	const DATA = NEW_DATA.reverse().map((item, iterator) => ({
	// 		key      : `cal-${timeline}-${pagination}-${iterator}`,
	// 		label    : format(item, FORMAT_TYPE[timeline]?.label),
	// 		subLabel : format(item, FORMAT_TYPE[timeline]?.subLabel),
	// 		date     : new Date(item),
	// 	}));
	// 	setCalendarData(DATA);
	// }, [pagination, setCalendarData, timeline]);

	const addProcessData = useCallback((func) => {
		const NEW_DATA = [];
		for (let i = NUMBER_OF_ELEMENTS + ((pagination - ADD_ONE) * ELEMENT_SHIFT);
			i < NUMBER_OF_ELEMENTS + (pagination * ELEMENT_SHIFT); i += ADD_ONE) {
			NEW_DATA.push(func(i));
		}
		const DATA = NEW_DATA.map((item, iterator) => ({
			key      : `cal-${timeline}-${pagination}-${iterator}`,
			// label    : format(item, FORMAT_TYPE[timeline].label),
			// subLabel : format(item, FORMAT_TYPE[timeline].subLabel),
			label    : 'fix it',
			subLabel : 'fix it',
			date     : new Date(item),
		}));

		setCalendarData((prev) => ([...DATA, ...prev]));
	}, [pagination, setCalendarData, timeline]);

	// const loadWeeks = useCallback(() => {
	// 	const NEW_DATA = [];
	// 	for (let i = 0; i < NUMBER_OF_ELEMENTS + (pagination * NUMBER_OF_ELEMENTS); i += ADD_ONE) {
	// 		NEW_DATA.push(calcWeek(i));
	// 	}
	// 	const DATA = NEW_DATA.map((item, iterator) => {
	// 		const startDate = new Date(item);
	// 		const endDate = new Date(startDate);
	// 		endDate.setDate(startDate.getDate() + ADD_SIX);
	// 		return {
	// 			key      : `cal-${timeline}-${pagination}-${iterator}`,
	// 			label    : format(item, FORMAT_TYPE[timeline].label),
	// 			subLabel : `${format(
	// 				item,
	// 				FORMAT_TYPE[timeline].subLabel,
	// 			)} to ${format(endDate, FORMAT_TYPE[timeline].subLabel)}`,
	// 			date: item,
	// 			endDate,
	// 		};
	// 	});
	// 	setCalendarData(DATA);
	// }, [calcWeek, pagination, setCalendarData, timeline]);

	// const addWeeks = useCallback(() => {
	// 	const NEW_DATA = [];
	// 	for (let i = NUMBER_OF_ELEMENTS + (ELEMENT_SHIFT * (pagination - ADD_ONE));
	// 		i < NUMBER_OF_ELEMENTS + (pagination * ELEMENT_SHIFT);
	// 		i += ADD_ONE) {
	// 		NEW_DATA.push(calcWeek(i));
	// 	}
	// 	const DATA = [];
	// 	NEW_DATA.reverse().forEach((item, iterator) => {
	// 		const startDate = new Date(item);
	// 		const endDate = startDate;
	// 		endDate.setDate(startDate.getDate() + ADD_SIX);
	// 		DATA.push({
	// 			key      : `cal-${timeline}-${pagination}-${iterator}`,
	// 			label    : format(item, FORMAT_TYPE[timeline].label),
	// 			subLabel : `${format(item, FORMAT_TYPE[timeline].subLabel)}
	// 			to ${format(endDate, FORMAT_TYPE[timeline].subLabel)}`,
	// 			date: item,
	// 			endDate,
	// 		});
	// 	});
	// 	// setCalendarData((prev) => [...DATA, ...prev]);
	// }, [calcWeek, pagination, setCalendarData, timeline]);

	// useEffect(() => {
	// 	// setSelectedItem(new Date());
	// 	// setCalendarData([]);
	// 	// if (timeline === 'day') processData(calcDate);
	// 	// else if (timeline === 'month') processData(calcMonth);
	// 	// else loadWeeks();
	// }, [calcDate, calcMonth, loadWeeks, processData, setCalendarData, setSelectedItem, timeline]);

	// function addPagination(x) {
	// 	setPagination(x);
	// }
	const doPagination = useCallback(() => {
		// if (pagination !== GLOBAL_CONSTANTS.zeroth_index) {
		if (calendarData.length === GLOBAL_CONSTANTS.zeroth_index) {
			setCalendarData([]);
			if (timeline === 'day') addProcessData(calcDate);
			else if (timeline === 'month') addProcessData(calcMonth);
			// else addWeeks();
		}

		// }
	}, [addProcessData, calendarData, setCalendarData, calcDate, calcMonth, timeline]);

	useEffect(() => {
		doPagination();
		console.log('##########################');
	}, [doPagination, pagination]);

	const handleScroll = () => {
		const { scrollLeft } = calendarRef.current;
		// const { clientWidth } = calendarRef.current;

		// Do something with the scroll position and width
		// console.log('Scroll Left:', scrollLeft);
		// console.log('Client Width:', clientWidth);

		if (scrollLeft < ADD_ONE) {
			if (timeline === 'day') addProcessData(calcDate);
			else if (timeline === 'month') addProcessData(calcMonth);
			console.log('Scroll Left:');
		}
	};

	return (
		<div className={styles.calendar}>
			<button className={styles.nav_btn} disabled>
				<IcMArrowDoubleLeft />
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
				/>
			</div>
			<button disabled className={`${styles.nav_btn}`}>
				<IcMArrowDoubleRight />
			</button>
		</div>
	);
}
export default Calendar;
