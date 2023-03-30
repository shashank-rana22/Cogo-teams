import monthOptions from '../constants/month-options';
import useGetCustomAsyncOptions from '../hooks/useCustomAsyncOptions';

const useGetControls = ({ leftFilters = [], rightFilters = [], filterProps = {} }) => {
	const { Department = '', Designation = '', Month:selectedMonth, Year:selectedYear } = filterProps;
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const designationOptions = useGetCustomAsyncOptions({
		endpoint    : 'get_iris_get_department_mappings',
		initialCall : false,
		params      : {
			Department,
		},
		valueKey  : 'designation',
		labelKey  : 'designation',
		filterKey : 'Qdesignation',
	});

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
			placeholder : 'Select...',
			options     : [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
				{ label: '5', value: 5 },
			],
		},
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
			options     : selectedYear === year
				? monthOptions.filter((newMonth) => newMonth.index <= month) : monthOptions,
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
		}, {
			name        : 'department',
			placeholder : 'Department...',
			label       : 'Department',
			type        : 'select',
			span        : 5,
			isClearable : !Designation,
			style       : { marginLeft: '1px', marginRight: '1px' },
			rules       : { required: 'Required' },
			options     : [
				{ label: 'Technology', value: 'Technology' },
				{ label: 'Marketing', value: 'Marketing' },
				{ label: 'Design', value: 'Design' },
				{ label: 'Business Development', value: 'Business Development' },
				{ label: 'Quality', value: 'Quality' },
				{ label: 'Product', value: 'Product' },
			],
		},
		{
			...designationOptions,
			name        : 'designation',
			placeholder : 'Designation...',
			label       : 'Designation',
			type        : 'select',
			span        : 5,
			disabled    : !Department,
			style       : { marginLeft: '1px', marginRight: '1px' },
			rules       : { required: 'Required' },
			isClearable : true,
		},
	];

	const FilterControls = {
		left  : [],
		right : [],
	};

	leftFilters.forEach((name) => {
		const updatedControl = control.find((ctrl) => ctrl.name === name);
		if (control.name === 'month' && selectedYear === year) {
			updatedControl.options = monthOptions.filter((newMonth) => newMonth.index <= month);
		}
		FilterControls.left.push(updatedControl);
	});

	rightFilters.forEach((name) => {
		const updatedControl = control.find((ctrl) => ctrl.name === name);
		if (control.name === 'month' && selectedYear === year) {
			updatedControl.options = monthOptions.filter((newMonth) => newMonth.index <= month);
		}
		FilterControls.right.push(updatedControl);
	});

	return FilterControls;
};

export default useGetControls;
