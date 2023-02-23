// import { format } from '@cogoport/utils';
import { IcMArrowDoubleLeft, IcMArrowDoubleRight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import { DateEntity, MonthEntity, WeekEntity } from './Entity';
import styles from './styles.module.css';

function Calendar() {
	const [pagination, setPagination] = useState(0);
	const [dates, setDates] = useState([]);
	const [months, setMonths] = useState([]);
	const [weeks, setWeeks] = useState([]);
	const [calendarData, setCalendarData] = useState([]);

	const numberOfDays = 14;
	const numberOfMonthsForWeeks = 2;
	const calcDate = (subtractDays) => {
		const d = new Date();
		d.setDate(d.getDate() - subtractDays);
		return d;
	};

	const loadDates = () => {
		const newDates = [];
		for (let i = pagination * numberOfDays; i < (pagination + 1) * numberOfDays; i += 1) {
			newDates.push(calcDate(i));
		}
		setDates(newDates.reverse());
	};

	const calcMonth = (subtractMonths) => {
		const d = new Date();
		d.setMonth(d.getMonth() - subtractMonths);
		return d;
	};

	const loadMonths = () => {
		const newMonths = [];
		for (let i = pagination * numberOfDays; i < (pagination + 1) * numberOfDays; i += 1) {
			newMonths.push(calcMonth(i));
		}
		setMonths(newMonths.reverse());
	};

	function getWeeksOfMonth(month, year) {
		const newWeeks = [];
		const firstDate = new Date(year, month, 1);
		const lastDate = new Date(year, month + 1, 0);
		const numDays = lastDate.getDate();

		let iterator = 1;
		let start = 1;
		let end = 7 - firstDate.getDay();
		if (start === 'monday') {
			if (firstDate.getDay() === 0) {
				end = 1;
			} else {
				end = 7 - firstDate.getDay() + 1;
			}
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

	const loadWeeks = () => {
		let newWeeks = [];
		for (let i = pagination * numberOfMonthsForWeeks; i < (pagination + 1) * numberOfMonthsForWeeks; i += 1) {
			const newDate = calcMonth(i);
			newWeeks = [...newWeeks, ...getWeeksOfMonth(newDate.getMonth(), newDate.getFullYear(), newDate)];
		}
		console.log(newWeeks);
		setWeeks(newWeeks.reverse());
	};

	useEffect(() => {
		loadDates();
		loadMonths();
		loadWeeks();
	}, [pagination]);

	return (
		<>
			<div className={styles.calendar}>
				<button onClick={() => setPagination(pagination + 1)} className={styles.navBtn}>
					<IcMArrowDoubleLeft />
				</button>
				<DateEntity dates={dates} />
				<button
					disabled={pagination === 0}
					onClick={() => setPagination(pagination - 1)}
					className={`${styles.navBtn} ${(pagination === 0) ? styles.inactive : ''}`}
				>
					<IcMArrowDoubleRight />
				</button>
			</div>
			{/* <div className={styles.calendar}>
				<button onClick={() => setPagination(pagination + 1)} className={styles.navBtn}>
					<IcMArrowDoubleLeft />
				</button>
				<MonthEntity months={months} />
				<button
					disabled={pagination === 0}
					onClick={() => setPagination(pagination - 1)}
					className={`${styles.navBtn} ${(pagination === 0) ? styles.inactive : ''}`}
				>
					<IcMArrowDoubleRight />
				</button>
			</div>
			<div className={styles.calendar}>
				<button onClick={() => setPagination(pagination + 1)} className={styles.navBtn}>
					<IcMArrowDoubleLeft />
				</button>
				<WeekEntity weeks={weeks} />
				<button
					disabled={pagination === 0}
					onClick={() => setPagination(pagination - 1)}
					className={`${styles.navBtn} ${(pagination === 0) ? styles.inactive : ''}`}
				>
					<IcMArrowDoubleRight />
				</button>
			</div> */}
		</>
	);
}

export default Calendar;
