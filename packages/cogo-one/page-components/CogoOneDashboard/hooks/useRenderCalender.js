import { useCallback } from 'react';

const ONE = 1;
const SIX = 6;
const SEVEN = 7;
export default function useRenderCalender() {
	const calcDate = useCallback((subtractDays) => {
		const d = new Date();
		d.setDate(d.getDate() - subtractDays);
		return d;
	}, []);

	const calcMonth = useCallback((subtractMonths) => {
		const d = new Date();
		d.setDate(ONE);
		d.setMonth(d.getMonth() - subtractMonths);
		return d;
	}, []);

	const calcWeek = useCallback((subtractWeeks) => {
		const d = new Date();
		if (d.getDay() !== ONE) {
			d.setDate(d.getDate() - ((d.getDay() + SIX) % SEVEN));
		}
		d.setDate(d.getDate() - (subtractWeeks * SEVEN));
		return d;
	}, []);

	return (
		{
			calcDate,
			calcMonth,
			calcWeek,
		}
	);
}
