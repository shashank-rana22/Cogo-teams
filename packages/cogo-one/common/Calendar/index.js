import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

function Calendar({ calendarType = 'month' }) {
	const [pagination, setPagination] = useState(0);
	const [calendarData, setCalendarData] = useState([]);

	const numberOfDays = 14;
	const numberOfMonthsForWeeks = 2;

	const calcDate = (subtractDays) => {
		const d = new Date();
		d.setDate(d.getDate() - subtractDays);
		return d;
	};

	function getWeeksOfMonth(month, year) {
		const newWeeks = [];
		const firstDate = new Date(year, month, 1);
		const lastDate = new Date(year, month + 1, 0);
		const numDays = lastDate.getDate();

		let iterator = 1;
		let start = 1;
		let end = 7 - firstDate.getDay() + 1;
		if (firstDate.getDay() === 0) {
			end = 1;
		}
		while (start <= numDays) {
			newWeeks.push({ start, end, date: new Date(year, month, start), iterator });
			iterator += 1;
			start = end + 1;
			end += 7;
			end = start === 1 && end === 8 ? 1 : end;
			if (end > numDays) {
				end = numDays;
			}
		}
		return newWeeks.reverse();
	}

	const calcMonth = (subtractMonths) => {
		const d = new Date();
		d.setMonth(d.getMonth() - subtractMonths);
		return d;
	};

	const FORMAT_TYPE = {
		day: {
			label    : 'dd',
			subLabel : 'MMM yy',
		},
		week: {
			label    : '',
			subLabel : 'MMM',
		},
		month: {
			label    : 'MMM',
			subLabel : 'yyyy',
		},
	};

	const processData = (func) => {
		const newData = [];
		for (let i = pagination * numberOfDays; i < (pagination + 1) * numberOfDays; i += 1) {
			newData.push(func(i));
		}
		const data = [];
		newData.reverse().forEach((item) => {
			data.push({
				head : format(item, FORMAT_TYPE[calendarType].label),
				text : format(item, FORMAT_TYPE[calendarType].subLabel),
			});
		});
		setCalendarData(data);
	};

	const loadWeeks = () => {
		let newWeeks = [];
		for (let i = pagination * numberOfMonthsForWeeks; i < (pagination + 1) * numberOfMonthsForWeeks; i += 1) {
			const newDate = calcMonth(i);
			newWeeks = [...newWeeks, ...getWeeksOfMonth(newDate.getMonth(), newDate.getFullYear(), newDate)];
		}
		const todayDate = new Date();
		const data = [];
		newWeeks.reverse().forEach((week) => {
			if (todayDate.getTime() >= week.date.getTime()) {
				data.push(
					{
						head : `Week ${week.iterator}`,
						text : `${format(week.date, 'MMM')} ${week.start} to ${week.end}`,
					},
				);
			}
		});
		setCalendarData(data);
	};

	useEffect(() => {
		if (calendarType === 'day') processData(calcDate);
		else if (calendarType === 'month') processData(calcMonth);
		else loadWeeks();
	}, [calendarType, pagination]);

	return (
		<div className={styles.calendar}>
			<button onClick={() => setPagination(pagination + 1)} className={styles.navBtn}>
				<IcMArrowDoubleLeft />
			</button>
			<CalendarEntity calendarData={calendarData} />
			<button
				disabled={pagination === 0}
				onClick={() => setPagination(pagination - 1)}
				className={`${styles.navBtn} ${(pagination === 0) ? styles.inactive : ''}`}
			>
				<IcMArrowDoubleRight />
			</button>
		</div>
	);
}

export default Calendar;
