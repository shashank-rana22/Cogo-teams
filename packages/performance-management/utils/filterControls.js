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
		params      : { Department },
		valueKey    : 'designation',
		labelKey    : 'designation',
		filterKey   : 'Qdesignation',
	});

	const asyncManagerOptions = useGetCustomAsyncOptions({
		endpoint    : 'get_iris_list_reportees',
		initialCall : false,
		params      : { IncludingCeos: true },
		valueKey    : 'user_id',
		labelKey    : 'name',
		filterKey   : 'Q',
	});

	const control = [
		{
			label       : 'Manager Name',
			name        : 'Q',
			placeholder : 'Search User...',
			type        : 'text',
			isClearable : true,
		},
		{
			name        : 'Rating',
			label       : 'rating',
			type        : 'select',
			isClearable : true,
			placeholder : 'Rating...',
			options     : [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
				{ label: '5', value: 5 },
			],
		},
		{
			name       	: 'ManagerID',
			placeholder	: 'Manager...',
			type       	: 'select',
			isClearable : true,
			...asyncManagerOptions,
		},
		{
			name        : 'Year',
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
			name        : 'Month',
			label       : 'Select Month',
			type        : 'select',
			isClearable : true,
			disabled    : !selectedYear,
			placeholder : 'Month',
			options     : selectedYear === year
				? monthOptions.filter((newMonth) => newMonth.index <= month) : monthOptions,
		},
		{
			name        : 'CsvType',
			label       : 'CSV Type',
			placeholder : 'Type',
			type        : 'select',
			isClearable : true,
			style       : { marginLeft: '1px', marginRight: '1px' },
			options     : [
				{ label: 'PIP', value: 'pip' },
				{ label: 'Probation', value: 'probation' },
				{ label: 'Normalization', value: 'approve_ratings' },
				{ label: 'Onboarding', value: 'onboarding' },
			],
		},
		{
			name                  : 'date_range',
			label                 : 'Select Date',
			type                  : 'dateRangePicker',
			isPreviousDaysAllowed : true,
		}, {
			name        : 'Department',
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
			name        : 'Designation',
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

	const filterControls = {
		left  : [],
		right : [],
	};

	leftFilters.forEach(({ name, ...rest }) => {
		let updatedControl = control.find((ctrl) => ctrl.name === name);
		updatedControl = { ...updatedControl, ...rest };
		if (control.name === 'month' && selectedYear === year) {
			updatedControl.options = monthOptions.filter((newMonth) => newMonth.index <= month);
		}
		filterControls.left.push(updatedControl);
	});

	rightFilters.forEach(({ name, ...rest }) => {
		let updatedControl = control.find((ctrl) => ctrl.name === name);
		updatedControl = { ...updatedControl, ...rest };
		if (control.name === 'month' && selectedYear === year) {
			updatedControl.options = monthOptions.filter((newMonth) => newMonth.index <= month);
		}
		filterControls.right.push(updatedControl);
	});

	return filterControls;
};

export default useGetControls;
