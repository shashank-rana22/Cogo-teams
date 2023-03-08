import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';

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

	const FORMAT_TYPE = {
		day: {
			label    : 'dd',
			subLabel : 'MMM yy',
		},
		week: {
			label    : 'MMM yyyy',
			subLabel : 'dd',
		},
		month: {
			label    : 'MMM',
			subLabel : 'yyyy',
		},
	};

	const calcDate = (subtractDays) => {
		const d = new Date();
		d.setDate(d.getDate() - subtractDays);
		return d;
	};

	const calcMonth = (subtractMonths) => {
		const d = new Date();
		d.setDate(1);
		d.setMonth(d.getMonth() - subtractMonths);
		return d;
	};

	const calcWeek = (subtractWeeks) => {
		const d = new Date();
		if (d.getDay() !== 1) {
			d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
		}
		d.setDate(d.getDate() - (subtractWeeks * 7));
		return d;
	};

	const processData = (func) => {
		const newData = [];
		for (let i = 0; i < numberOfElements; i += 1) {
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
		for (let i = 0; i < numberOfElements; i += 1) {
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
		setPagination(0);
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
			<button
				className={styles.navBtn}
				disabled
			>
				<IcMArrowDoubleLeft />
			</button>
			<div ref={calendarRef} className={styles.calendarEntity}>
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
			<button
				disabled
				className={`${styles.navBtn} 
				`}
			>
				<IcMArrowDoubleRight />
			</button>
		</div>
	);
}

export default Calendar;
