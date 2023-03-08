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
	console.log(props, calendarData, 'props');

	const [pagination, setPagination] = useState(0);
	const [weekPagination, setWeekPagination] = useState(0);

	const calendarRef = useRef();
	const numberOfDays = 30;
	const shiftDays = 30;
	const numberOfMonthsForWeeks = 2;

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

	// function getWeeksOfMonth(month, year) {
	// 	const newWeeks = [];
	// 	const firstDate = new Date(year, month, 1);
	// 	const lastDate = new Date(year, month + 1, 0);
	// 	const numDays = lastDate.getDate();

	// 	let iterator = 1;
	// 	let start = 1;
	// 	let end = 7 - firstDate.getDay() + 1;
	// 	if (firstDate.getDay() === 0) {
	// 		end = 1;
	// 	}
	// 	while (start <= numDays) {
	// 		newWeeks.push({
	// 			start,
	// 			end,
	// 			date: new Date(year, month, start),
	// 			iterator,
	// 		});
	// 		iterator += 1;
	// 		start = end + 1;
	// 		end += 7;
	// 		end = start === 1 && end === 8 ? 1 : end;
	// 		if (end > numDays) {
	// 			end = numDays;
	// 		}
	// 	}
	// 	return newWeeks.reverse();
	// }

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
		for (let i = 0; i < numberOfDays; i += 1) {
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
		for (let i = numberOfDays + (shiftDays * (pagination - 1));
			i < numberOfDays + (pagination * shiftDays);
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
		for (let i = numberOfDays + (shiftDays * (weekPagination - 1));
			i < numberOfDays + (weekPagination * shiftDays);
			i += 1) {
			newData.push(calcWeek(i));
		}
		// console.log('newData:', newData);
		const data = [];
		newData.reverse().forEach((item, iterator) => {
			const startDate = new Date(item);
			const endDate = startDate;
			endDate.setDate(startDate.getDate() + 6);
			data.push({
				key      : `cal-${timeline}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[timeline].label),
				subLabel : `${format(item, FORMAT_TYPE[timeline].subLabel)} to ${format(endDate, FORMAT_TYPE[timeline].subLabel)}`,
				date     : item,
				endDate,
			});
		});
		setCalendarData(data);
	};

	// function getMonday(d) {
	// 	const newD = new Date(d);
	// 	const day = newD.getDay();
	// 	const diff = newD.getDate() - day + (day === 0 ? -6 : 1);
	// 	return new Date(newD.setDate(diff));
	// }

	// const loadWeeks = () => {
	// 	let newWeeks = [];
	// 	for (let i = 0;
	// 		i < (weekPagination * numberOfMonthsForWeeks + (3 * numberOfMonthsForWeeks));
	// 		i += 1) {
	// 		const newDate = calcMonth(i);
	// 		newWeeks = [...newWeeks, ...getWeeksOfMonth(newDate.getMonth(), newDate.getFullYear(), newDate)];
	// 	}
	// 	const todayDate = new Date();
	// 	const data = [];
	// 	newWeeks.reverse().forEach((week, index) => {
	// 		if (todayDate.getTime() >= week.date.getTime()) {
	// 			data.push(
	// 				{
	// 					key      : `cal-week-${pagination}-${index}`,
	// 					label    : `Week ${week.iterator}`,
	// 					subLabel : `${format(week.date, 'MMM')} ${week.start} to ${week.end}`,
	// 					date     : getMonday(new Date(week.date)),
	// 				},
	// 			);
	// 		}
	// 	});
	// 	setCalendarData(data);
	// };

	useEffect(() => {
		setCalendarData([]);
		setPagination(0);
		setWeekPagination(0);
		if (timeline === 'day') processData(calcDate);
		else if (timeline === 'month') processData(calcMonth);
		else loadWeeks();
	}, [timeline]);

	function addPagination(x) {
		if (timeline === 'day' || timeline === 'month') {
			setPagination(x);
		} else {
			console.log('___x___: ', x);
			// setWeekPagination(x);
		}
	}

	function doPagination() {
		if (pagination !== 0) {
			if (timeline === 'day') addProcessData(calcDate);
			else if (timeline === 'month') addProcessData(calcMonth);
			return;
		}
		if (weekPagination !== 0) loadWeeks();
	}

	useEffect(() => {
		doPagination();
	}, [pagination, weekPagination]);

	useEffect(() => {
		console.log('calendarData', calendarData);
	}, [calendarData]);

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
