import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formControls = ({ showUpdate }) => [
	{
		name        : 'containers',
		type        : 'doubleNestedFieldArray',
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
				value       : showUpdate?.data?.container_no?.[GLOBAL_CONSTANTS.zeroth_index],
				rules       : { required: 'This is required' },
				disabled    : showUpdate?.data?.search_type === 'CONTAINER_NO',
			},
			{
				name        : 'locations',
				type        : 'nestedFieldArray',
				showButtons : true,
				buttonText  : 'Add Milestones',
				value       : {},
				span        : 12,
				controls    : [
					{
						name        : 'location_id',
						type        : 'async_select',
						asyncKey    : 'list_locations',
						placeholder : 'Select Location',
						label       : 'Location',
						span        : 9,
						rules       : { required: 'This is required' },
					},
					{
						name               : 'margin_values',
						label              : 'Mile Stone',
						type               : 'fieldArray',
						buttonText         : 'Add Field',
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
								label    : 'Milestone',
								name     : 'milestone',
								type     : 'creatable_select',
								asyncKey : 'list_shipping_line_events',
								params   : {
									shipping_line_id : showUpdate?.data?.shipping_line_id,
									source           : 'tracking_job',
								},
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
							}],
					},

				],
			},
		],
	},
];

export default formControls;
