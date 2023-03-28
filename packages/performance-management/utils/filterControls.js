// const useGetControls = (filterArr) => {
const useGetControls = ({ name = 'manager' }) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	const control = [
		{
			label       : 'Manager Name',
			name        : 'manager_name',
			placeholder : 'Search Manager...',
			type        : 'text',
			isClearable : true,
		},
		{
			name        : 'rating',
			label       : 'Rating',
			type        : 'select',
			isClearable : true,
			placeholder : 'Select..',
			options     : [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
				{ label: '5', value: 5 },
			],
		},
		{
			name        : 'created_at_month',
			label       : 'Select Month',
			type        : 'select',
			isClearable : true,
			placeholder : 'Month',
			options     : [
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
			],
		},
		{
			name        : 'created_at_year',
			label       : 'Select Year',
			type        : 'select',
			isClearable : true,
			placeholder : 'Year',
			options     : [
				{ label: `${year}`, value: year },
				{ label: `${year - 1}`, value: year - 1 },
				{ label: `${year - 2}`, value: year - 2 },
			],
		},
		{
			name        : 'status',
			lable       : 'Status',
			placeholder : 'Type',
			type        : 'select',
			isClearable : true,
			style       : { marginLeft: '1px', marginRight: '1px' },
			options     : [
				{ label: 'PIP', value: 'pip' },
				{ label: 'Probation', value: 'probation' },
			],
		},
		{
			name                  : 'date_range',
			label                 : 'Select Date',
			type                  : 'dateRangePicker',
			isPreviousDaysAllowed : true,
		},
	];

	return control.find((cntrl) => cntrl.name === name);

	// const newControls = [];

	// filterArr.forEach((name) => {
	// 	const updatedControl = control.find((ctrl) => ctrl.name === name);
	// 	newControls.push(updatedControl);
	// });

	// return newControls;
};

export default useGetControls;
