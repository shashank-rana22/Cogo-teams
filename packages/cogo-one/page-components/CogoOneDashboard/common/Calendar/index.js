/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';

import { FORMAT_TYPE } from '../../configurations/dashboard';
import useRenderCalender from '../../hooks/useRenderCalender';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

function Calendar({ props }) {
	const {
		timeline,
		calendarData,
		setCalendarData = () => {},
		selectedItem,
		setSelectedItem,
	} = props || {};

	const [pagination, setPagination] = useState(0);

	const calendarRef = useRef();
	const numberOfElements = 30;
	const elementShift = 30;

	const {
		calcDate,
		calcMonth,
		calcWeek,
	} = useRenderCalender();

	const processData = (func) => {
		const newData = [];
		for (let i = 0; i < numberOfElements + (pagination * numberOfElements); i += 1) {
			newData.push(func(i));
		}
		const data = [];
		newData.reverse().forEach((item, iterator) => {
			data.push({
				key      : `cal-${timeline}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[timeline]?.label),
				subLabel : format(item, FORMAT_TYPE[timeline]?.subLabel),
				date     : new Date(item),
			});
		});
		setCalendarData(data);
	};

	const addProcessData = (func) => {
		const newData = [];
		for (let i = numberOfElements + (elementShift * (pagination - 1));
			i < numberOfElements + (pagination * elementShift);
			i += 1) {
			newData.push(func(i));
		}
		const data = [];
		newData.reverse().forEach((item, iterator) => {
			data.push({
				key      : `cal-${timeline}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[timeline].label),
				subLabel : format(item, FORMAT_TYPE[timeline].subLabel),
				date     : new Date(item),
			});
		});
		setCalendarData([...data, ...calendarData]);
	};

	const loadWeeks = () => {
		const newData = [];
		for (let i = 0; i < numberOfElements + (pagination * numberOfElements); i += 1) {
			newData.push(calcWeek(i));
		}
		const data = [];
		newData.reverse().forEach((item, iterator) => {
			const startDate = new Date(item);
			const endDate = startDate;
			endDate.setDate(startDate.getDate() + 6);
			data.push({
				key      : `cal-${timeline}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[timeline].label),
				subLabel : `${format(item, FORMAT_TYPE[timeline].subLabel)} 
							to
				 			${format(endDate, FORMAT_TYPE[timeline].subLabel)}`,
				date: item,
				endDate,
			});
		});
		setCalendarData(data);
	};

	const addWeeks = () => {
		const newData = [];
		for (let i = numberOfElements + (elementShift * (pagination - 1));
			i < numberOfElements + (pagination * elementShift);
			i += 1) {
			newData.push(calcWeek(i));
		}
		const data = [];
		newData.reverse().forEach((item, iterator) => {
			const startDate = new Date(item);
			const endDate = startDate;
			endDate.setDate(startDate.getDate() + 6);
			data.push({
				key      : `cal-${timeline}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[timeline].label),
				subLabel : `${format(item, FORMAT_TYPE[timeline].subLabel)} 
				to ${format(endDate, FORMAT_TYPE[timeline].subLabel)}`,
				date: item,
				endDate,
			});
		});
		setCalendarData([...data, ...calendarData]);
	};

	useEffect(() => {
		setSelectedItem(new Date());
		setCalendarData([]);
		if (timeline === 'day') processData(calcDate);
		else if (timeline === 'month') processData(calcMonth);
		else loadWeeks();
	}, [timeline]);

	function addPagination(x) {
		setPagination(x);
	}

	function doPagination() {
		if (pagination !== 0) {
			if (timeline === 'day') addProcessData(calcDate);
			else if (timeline === 'month') addProcessData(calcMonth);
			else addWeeks();
		}
	}

	useEffect(() => {
		doPagination();
	}, [pagination]);

	return (
		<div className={styles.calendar}>
			<button className={styles.nav_btn} disabled>
				<IcMArrowDoubleLeft />
			</button>
			<div ref={calendarRef} className={styles.calendar_entity}>
				<CalendarEntity
					calendarData={calendarData}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					pagination={pagination}
					setPagination={setPagination}
					timeline={timeline}
					addPagination={addPagination}
				/>
			</div>
			<button disabled className={`${styles.nav_btn}`}>
				<IcMArrowDoubleRight />
			</button>
		</div>
	);
}
export default Calendar;
