import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formControls = ({ showUpdate }) => [
	{
		name          : 'containers',
		type          : 'doubleNestedFieldArray',
		showButtons   : true,
		addButtonText : 'Add Container',

		controls: [
			{
				name        : 'container_no',
				type        : 'text',
				placeholder : 'Enter Container No',
				label       : 'Container No',
				size        : 'sm',
				span        : 5,
				value       : showUpdate?.data?.container_no?.[GLOBAL_CONSTANTS.zeroth_index],
				rules       : { required: 'This is required' },
				disabled    : showUpdate?.data?.search_type === 'CONTAINER_NO',
			},
			{
				name          : 'locations',
				type          : 'nestedFieldArray',
				showButtons   : true,
				addButtonText : 'Add Location',
				span          : 12,
				controls      : [
					{
						name        : 'location_id',
						type        : 'async_select',
						asyncKey    : 'list_locations',
						placeholder : 'Select Location',
						size        : 'sm',
						label       : 'Location',
						span        : 9,
						rules       : { required: 'This is required' },
					},
					{
						name               : 'milestones',
						label              : 'Mile Stone',
						type               : 'fieldArray',
						addButtonText      : 'Add MileStone',
						noDeleteButtonTill : 1,
						controls           : [
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
								label        : 'Milestone',
								name         : 'milestone',
								type         : 'async_create_select',
								placeholder  : 'Milestone',
								size         : 'sm',
								asyncKey     : 'list_shipping_line_events',
								optionsValue : 'milestone',
								params       : {
									shipping_line_id : showUpdate?.data?.shipping_line_id,
									source           : 'tracking_job',
								},
								span  : 6,
								rules : { required: 'This is required' },
							},
							{
								label       : 'Transport Mode',
								name        : 'transport_mode',
								type        : 'text',
								size        : 'sm',
								placeholder : 'Transport Mode',
								span        : 6,
								rules       : { required: 'This is required' },
							},
							{
								label       : 'Vessel Name',
								name        : 'vessel_name',
								type        : 'text',
								size        : 'sm',
								placeholder : 'Vessel Name',
								span        : 6,
								rules       : { required: 'This is required' },
							},
							{
								label       : 'Voyage No',
								name        : 'voyage_no',
								type        : 'text',
								placeholder : 'Voyage no',
								size        : 'sm',
								span        : 6,
								rules       : { required: 'This is required' },
							}],
					},

				],
			},
		],
	},
];

export default formControls;
