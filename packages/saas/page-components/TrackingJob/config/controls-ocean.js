const formControls = ({ isDisabled, shipping_line_id }) => [
	{
		name        : 'containers',
		type        : 'nestedFieldArray',
		showButtons : true,
		buttonText  : 'Add Container',
		value       : {},
		controls    : [
			{
				name        : 'container_no',
				type        : 'text',
				placeholder : 'Enter Container No',
				label       : 'Container No',
				span        : 5,
				className   : 'primary md',
				// value       : [{ container_no: '' }],
				rules       : { required: 'This is required' },
				// disabled    : isDisabled,
			},
			{
				name        : 'milestones',
				type        : 'fieldArray',
				showButtons : true,
				buttonText  : 'Add Milestones',
				value       : {},
				span        : 12,
				controls    : [

					{
						name           : 'location_id',
						type           : 'async_select',
						asyncKey       : 'list_locations',
						placeholder    : 'Select Location',
						label          : 'Location',
						optionsListKey : 'locations',
						span           : 9,
						className      : 'primary md',
						rules          : { required: 'This is required' },
					},

					{
						label          : 'Event Date',
						name           : 'event_date',
						type           : 'date_picker',
						withTimePicker : true,
						placeholder    : 'Event Date',
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
						label       : 'Transport Mode',
						name        : 'transport_mode',
						type        : 'text',
						placeholder : 'Transport Mode',
						span        : 6,
						rules       : { required: 'This is required' },
					},
					{
						label       : 'Vessel Name',
						name        : 'vessel_name',
						type        : 'text',
						placeholder : 'Vessel Name',
						span        : 6,
						rules       : { required: 'This is required' },
					},
					{
						label       : 'Voyage No',
						name        : 'voyage_no',
						type        : 'text',
						placeholder : 'Voyage no',
						span        : 6,
						rules       : { required: 'This is required' },
					},
				],
			},
		],
	},
];

export default formControls;
