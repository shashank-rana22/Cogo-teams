const today = new Date();
const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
const months = [];

for (let d = sixMonthsAgo; d <= today; d.setMonth(d.getMonth() + 1)) {
	const monthYear = d.toLocaleString('default', { month: 'long', year: 'numeric' });
	months.push(monthYear);
}

export const optionMonth = months.map((data) => ({
	label : data,
	value : data,
}));
