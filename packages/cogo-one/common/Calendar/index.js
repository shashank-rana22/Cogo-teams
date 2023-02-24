import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';

import { CalendarEntity } from './Entity';
import styles from './styles.module.css';

function Calendar({ calendarType }) {
	const [pagination, setPagination] = useState(-1);
	const [calendarData, setCalendarData] = useState([]);
	const [selectedItem, setSelectedItem] = useState('');
	const [scroll, setScroll] = useState('');
	const [resetDiv, setResetDiv] = useState(false);

	const calendarRef = useRef();
	const numberOfDays = 10;
	const numberOfMonthsForWeeks = 2;

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
			newWeeks.push({
				start,
				end,
				date: new Date(year, month, start),
				iterator,
			});
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

	const processData = (func) => {
		const newData = [];
		for (let i = pagination * numberOfDays; i < ((pagination * numberOfDays) + (3 * numberOfDays)); i += 1) {
			newData.push(func(i));
		}
		const data = [];
		newData.reverse().forEach((item, iterator) => {
			data.push({
				key      : `cal-${calendarType}-${pagination}-${iterator}`,
				label    : format(item, FORMAT_TYPE[calendarType].label),
				subLabel : format(item, FORMAT_TYPE[calendarType].subLabel),
			});
		});
		setCalendarData(data);
	};

	const loadWeeks = () => {
		let newWeeks = [];
		for (let i = pagination * numberOfMonthsForWeeks;
			i < (pagination * numberOfMonthsForWeeks + (3 * numberOfMonthsForWeeks));
			i += 1) {
			const newDate = calcMonth(i);
			newWeeks = [...newWeeks, ...getWeeksOfMonth(newDate.getMonth(), newDate.getFullYear(), newDate)];
		}
		const todayDate = new Date();
		const data = [];
		newWeeks.reverse().forEach((week, index) => {
			if (todayDate.getTime() >= week.date.getTime()) {
				data.push(
					{
						key      : `cal-week-${pagination}-${index}`,
						label    : `Week ${week.iterator}`,
						subLabel : `${format(week.date, 'MMM')} ${week.start} to ${week.end}`,
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

	useEffect(() => {
		console.log('calendarData: ', calendarData);
		setResetDiv(true);
		setTimeout(() => {
			setResetDiv(false);
		}, 100);
	}, [calendarData]);

	return (
		<div className={styles.calendar}>
			<button
				onClick={() => { setScroll('right'); }}
				className={styles.navBtn}
				disabled={scroll === 'right'}
			>
				<IcMArrowDoubleLeft />
			</button>
			<div ref={calendarRef} className={styles.calendarEntity}>
				<CalendarEntity
					calendarData={calendarData}
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
					scroll={scroll}
					setScroll={setScroll}
					resetDiv={resetDiv}
					pagination={pagination}
					setPagination={setPagination}
				/>
			</div>
			<button
				disabled={scroll === 'left' || pagination === -1}
				onClick={() => { setScroll('left'); }}
				className={`${styles.navBtn} 
				`}
			>
				<IcMArrowDoubleRight />
			</button>
		</div>
	);
}

export default Calendar;
