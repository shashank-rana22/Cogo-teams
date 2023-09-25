const controls = [
	{
		name          : 'locations',
		type          : 'nestedFieldArray',
		showButtons   : true,
		addButtonText : 'Add Location',
		value         : {},

		rules    : { required: 'This is required' },
		controls : [
			{
				name        : 'location_id',
				type        : 'async_select',
				placeholder : 'Select Location',
				label       : 'Location',
				asyncKey    : 'list_locations',
				initialCall : true,
				params      : {
					filters: {
						status : 'active',
						type   : 'airport',
					},
				},
				span  : 6,
				rules : { required: 'This is required' },
			},
			{
				name          : 'milestones',
				type          : 'fieldArray',
				showButtons   : true,
				addButtonText : 'Add Milestones',
				value         : {},
				span          : 12,
				controls      : [
					{
						label          : 'Expected Date',
						name           : 'expected_date',
						type           : 'date_picker',
						withTimePicker : true,
						placeholder    : 'Expected Date',
						span           : 6,
						rules          : { required: 'This is required' },
					},
					{
						label          : 'Actual Date',
						name           : 'actual_date',
						type           : 'date_picker',
						withTimePicker : true,
						placeholder    : 'Actual Date',
						span           : 6,
						rules          : { required: 'This is required' },
					},

					{
						label       : 'Milestone',
						name        : 'milestone',
						type        : 'text',
						placeholder : 'Milestone',
						span        : 6,
						rules       : { required: 'This is required' },
					},
					{
						label       : 'Piece',
						name        : 'piece',
						type        : 'text',
						placeholder : 'Number of piece',
						span        : 6,
						rules       : { required: 'This is required' },
					},
					{
						label       : 'Status',
						name        : 'status',
						type        : 'text',
						placeholder : 'Status',
						span        : 6,
						rules       : { required: 'This is required' },
					},
					{
						label       : 'Flight Number',
						name        : 'flight_number',
						type        : 'text',
						placeholder : 'Flight Number',
						span        : 6,
						rules       : { required: 'This is required' },
					},
				],
			},
		],
	},
];

export default controls;
