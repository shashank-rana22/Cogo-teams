import useGetCustomAsyncOptions from './useCustomAsyncOptions';

const useGetDepartmentControls = ({ Department = '', Designation = '' }) => {
	const designationOptions = useGetCustomAsyncOptions({
		endpoint    : 'get_department_mappings',
		initialCall : false,
		params      : {
			Department,
		},
		valueKey  : 'designation',
		labelKey  : 'designation',
		filterKey : 'Qdesignation',
	});

	return [
		{
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
				{ label: 'Trucking', value: 'Trucking' },
				{ label: 'Multi-modal / Trucking', value: 'Multi-modal / Trucking' },
				{ label: 'Marketing', value: 'Marketing' },
				{ label: 'Design', value: 'Design' },
				{ label: 'Finance', value: 'Finance' },
				{ label: 'Business Development', value: 'Business Development' },
				{ label: '', value: '' },
				{ label: 'Product', value: 'Product' },
				{ label: 'Experience (COE)', value: 'Experince (COE)' },
				{ label: 'Supply', value: 'Supply' },
				{ label: 'Channel Partner (Business)', value: 'Channel Partner (Business)' },
				{ label: 'Human Resources', value: 'Human Resources' },
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
};

export default useGetDepartmentControls;
