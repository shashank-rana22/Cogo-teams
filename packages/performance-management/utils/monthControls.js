import monthOptions from '../constants/month-options';

const getMonthControls = (selectedYear, selectedMonth) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const controls = [
		{
			name        : 'year',
			label       : 'Select Year',
			type        : 'select',
			isClearable : !selectedMonth,
			placeholder : 'Year',
			options     : [
				{ label: `${year}`, value: year },
				{ label: `${year - 1}`, value: year - 1 },
				{ label: `${year - 2}`, value: year - 2 },
			],
		},
		{
			name        : 'month',
			label       : 'Select Month',
			type        : 'select',
			isClearable : true,
			disabled    : !selectedYear,
			placeholder : 'Month',
			options     : monthOptions,
		},
		{
			name        : 'rating',
			label       : 'Rating',
			placeholder : 'Rating',
			type        : 'select',
			isClearable : true,
			options     : [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
				{ label: '5', value: 5 },
			],
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
