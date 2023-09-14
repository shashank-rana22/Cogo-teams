const START_DATE = 21;
const END_DATE = 20;
const DEFAULT_VALUE = 1;

const generateDateArray = (startDate, endDate) => {
	const DATE_ARRAY = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		DATE_ARRAY.push(currentDate.getDate());
		currentDate.setDate(currentDate.getDate() + DEFAULT_VALUE);
	}

	return DATE_ARRAY;
};

export const getDates = () => {
	const today = new Date();
	const dayOfMonth = today.getDate();

	let startDate;
	let endDate;

	if (dayOfMonth >= START_DATE) {
		startDate = new Date(today.getFullYear(), today.getMonth(), START_DATE);
		endDate = new Date(today.getFullYear(), today.getMonth() + DEFAULT_VALUE, END_DATE);
	} else {
		startDate = new Date(today.getFullYear(), today.getMonth() - DEFAULT_VALUE, START_DATE);
		endDate = new Date(today.getFullYear(), today.getMonth(), END_DATE);
	}

	return generateDateArray(startDate, endDate);
};
