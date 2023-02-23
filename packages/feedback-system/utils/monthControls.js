const monthOptions = [
	{ label: 'January', value: 1 },
	{ label: 'February', value: 2 },
	{ label: 'March', value: 3 },
	{ label: 'April', value: 4 },
	{ label: 'May', value: 5 },
	{ label: 'June', value: 6 },
	{ label: 'July', value: 7 },
	{ label: 'August', value: 8 },
	{ label: 'September', value: 9 },
	{ label: 'October', value: 10 },
	{ label: 'November', value: 11 },
	{ label: 'December', value: 12 },
];

const getMonthControls = (selectedYear, selectedMonth) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const control = {
		month: {
			name           : 'month',
			label          : 'Select Month',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Month',
			options        : monthOptions,
			span           : 6,
			disabled       : !selectedYear,
		},
		year: {
			name           : 'year',
			label          : 'Select Year',
			type           : 'select',
			defaultOptions : true,
			isClearable    : !selectedMonth,
			placeholder    : 'Year',
			value          : `${year}`,
			options        : [
				{ label: `${year}`, value: year },
				{ label: `${year - 1}`, value: year - 1 },
				{ label: `${year - 2}`, value: year - 2 },
			],
			span: 6,
		},
		rating: {
			name           : 'rating',
			label          : 'Rating',
			placeholder    : 'Rating',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			options        : [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
				{ label: '5', value: 5 },
			],
			span: 6,
		},
	};

	if (selectedYear === year) {
		control.month.options = monthOptions.filter((newMonth) => newMonth.value <= month);
	}

	return control;
};

export default getMonthControls;
