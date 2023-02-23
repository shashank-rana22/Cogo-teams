const monthOptions = [
	{ label: 'January', value: 'January', index: 1 },
	{ label: 'February', value: 'February', index: 2 },
	{ label: 'March', value: 'March', index: 3 },
	{ label: 'April', value: 'April', index: 4 },
	{ label: 'May', value: 'May', index: 5 },
	{ label: 'June', value: 'June', index: 6 },
	{ label: 'July', value: 'July', index: 7 },
	{ label: 'August', value: 'August', index: 8 },
	{ label: 'September', value: 'September', index: 9 },
	{ label: 'October', value: 'October', index: 10 },
	{ label: 'November', value: 'November', index: 11 },
	{ label: 'December', value: 'December', index: 12 },
];

const getMonthControls = (selectedYear, selectedMonth) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const controls = [
		{
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
		{
			name           : 'month',
			label          : 'Select Month',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			disabled       : !selectedYear,
			placeholder    : 'Month',
			options        : monthOptions,
			span           : 6,
		},
		{
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
	];

	const newControls = [];

	controls.forEach((control) => {
		const updatedControl = control;
		if (control.name === 'month' && selectedYear === year) {
			updatedControl.options = monthOptions.filter((newMonth) => newMonth.index <= month);
		}
		newControls.push(updatedControl);
	});

	return newControls;
};

export default getMonthControls;
