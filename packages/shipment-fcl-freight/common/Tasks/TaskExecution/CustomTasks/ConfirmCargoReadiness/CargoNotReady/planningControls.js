const planningControls = ({ fclServices = [] }) => [
	{
		name        : 'planning',
		showHeading : false,
		type        : 'fieldArray',
		heading     : 'Create Plan',
		controls    : [
			{
				name     : 'service_id',
				options  : fclServices,
				label    : 'Service',
				type     : 'select',
				valueKey : 'id',
				span     : 4,
			},
			{
				name  : 'containers_count',
				type  : 'number',
				rules : {
					required : 'Container Count is required',
					min      : 0,
				},
				label : 'Containers Count',
				span  : 3,

			},
			{
				name  : 'readiness_date',
				label : 'Estimated Cargo Readiness Date',
				type  : 'datepicker',
				span  : 4,
				rules : {
					required: 'Date is required',
				},
			},
		],
	},
];

export default planningControls;
