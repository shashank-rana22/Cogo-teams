import { useCallback } from 'react';

const DEFAULT_DATE_OF_MONTH = 1;
const WEEK_LAST_NUMBER = 6;
const WEEK_COUNT = 7;

export default function useRenderCalender() {
	const calcDate = useCallback((subtractDays) => {
		const d = new Date();
		d.setDate(d.getDate() - subtractDays);
		return d;
	}, []);

	const calcMonth = useCallback((subtractMonths) => {
		const d = new Date();
		d.setDate(DEFAULT_DATE_OF_MONTH);
		d.setMonth(d.getMonth() - subtractMonths);
		return d;
	}, []);

	const calcWeek = useCallback((subtractWeeks) => {
		const d = new Date();
		if (d.getDay() !== DEFAULT_DATE_OF_MONTH) {
			d.setDate(d.getDate() - ((d.getDay() + WEEK_LAST_NUMBER) % WEEK_COUNT));
		}
		d.setDate(d.getDate() - (subtractWeeks * WEEK_COUNT));
		return d;
	}, []);

	return {
		calcDate,
		calcMonth,
		calcWeek,
	};
}
