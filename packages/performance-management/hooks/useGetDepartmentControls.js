import useGetCustomAsyncOptions from './useCustomAsyncOptions';

const useGetDepartmentControls = ({ Department = '', Designation = '' }) => {
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
};

export default useGetDepartmentControls;
