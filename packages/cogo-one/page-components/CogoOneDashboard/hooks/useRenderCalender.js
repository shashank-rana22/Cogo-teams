export default function useRenderCalender() {
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

	return (
		{
			calcDate,
			calcMonth,
			calcWeek,
		}
	);
}
