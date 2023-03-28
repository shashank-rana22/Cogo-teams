const today = new Date();
const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
const months = [];

while (sixMonthsAgo <= today) {
	const dateString = sixMonthsAgo.toLocaleString('default', { month: 'long', year: 'numeric' });
	months.push(dateString);
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() + 1);
}

export const optionMonth = months.map((item) => ({ label: item, value: item }));
